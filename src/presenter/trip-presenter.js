import {RenderPositions, renderElement, remove} from '../utils/render.js';
import {sortItemsByTime, sortItemsByPrice, sortItemsByDay} from '../utils/common.js';
import MenuView from '../view/menu-view.js';
import NoPointsView from '../view/no-points-view.js';
import SortView from '../view/sort-view.js';
import EventsList from '../view/events-list-view.js';
import TripInfoView from '../view/trip-info-view.js';
import AddPointButtonView from '../view/add-point-view.js';
import StatsView from '../view/stats-view.js';
import MessageView from '../view/message-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import FilterPresenter from './filter-presenter.js';
import {SortType, UserAction, UpdateType, FilterType, TripTabsTypes, MESSAGES, State as PointPresenterViewState} from '../utils/constants.js';
import {filterFunctional} from '../utils/filter.js';

class TripPresenter {
  #tripMain = null;
  #menuContainer = null;
  #filterContainer = null;
  #listSection = null;
  #pointsModel = null;
  #filterModel = null;

  #menuComponent = new MenuView();
  #sortComponent = null;
  #addPointButtonComponent = new AddPointButtonView();
  #eventsContainer = new EventsList();
  #newFormPresenter = null;
  #noPointsComponent = null;
  #filterPresenter = null;
  #tripInfoComponent = null;
  #statsComponent = null;
  #loadingComponent = new MessageView(MESSAGES.LOADING);
  #errorComponent = new MessageView(MESSAGES.ERROR);

  #pointsStorage = new Map();
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;

  constructor(tripMain, menu, filterContainer, listSection, pointsModel, filterModel) {
    this.#tripMain = tripMain;
    this.#menuContainer = menu;
    this.#filterContainer = filterContainer;
    this.#listSection = listSection;
    this.#newFormPresenter = new NewPointPresenter(this.#eventsContainer.element, this.#onViewAction);

    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filterFunctional[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortItemsByDay);
      case SortType.TIME:
        return filteredPoints.sort(sortItemsByTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortItemsByPrice);
    }
    return filteredPoints;
  }

  get allPossisbleOffers() {
    return this.#pointsModel.allPossisbleOffers;
  }

  get allDestinations() {
    return this.#pointsModel.allDestinations;
  }

  init = () => {
    this.#filterPresenter = new FilterPresenter(this.#filterContainer, this.#filterModel, this.#pointsModel);
    this.#filterPresenter.init();
    this.#pointsModel.addObserver(this.#onModelEvent);
    this.#filterModel.addObserver(this.#onModelEvent);
    this.#renderBoard();
  }

  //рендеры
  #renderMenu = () => {
    renderElement(this.#menuContainer, this.#menuComponent, RenderPositions.BEFOREEND);
    this.#menuComponent.setOnMenuTabClick(this.#onMenuTabClick);
  }

  #renderEventsList = () => {
    renderElement(this.#listSection, this.#eventsContainer, RenderPositions.BEFOREEND);
  }

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setOnSortTypeChange(this.#onSortTypeChange);
    renderElement(this.#listSection, this.#sortComponent, RenderPositions.AFTERBEGIN);
  }

  #renderPoint = (container, pointData, allPossisbleOffers, allDestinations) => {
    const pointPresenter = new PointPresenter(container, this.#onViewAction, this.#onModeChange);
    pointPresenter.init(pointData, allPossisbleOffers, allDestinations);
    this.#pointsStorage.set(pointData.id, pointPresenter);
  }

  #renderTripInfo = (allPoints) => {
    this.#tripInfoComponent = new TripInfoView(allPoints);
    renderElement(this.#tripMain, this.#tripInfoComponent, RenderPositions.AFTERBEGIN);
  }

  #renderNoPoints = () => {
    this.#noPointsComponent = new NoPointsView(this.#filterType);
    renderElement(this.#eventsContainer.element, this.#noPointsComponent, RenderPositions.AFTERBEGIN);
  }

  #renderPointsList = (points, allPossisbleOffers, allDestinations) => {
    points.forEach((point) => this.#renderPoint(this.#eventsContainer.element, point, allPossisbleOffers, allDestinations));
  }

  #renderAddPointButton = () => {
    renderElement(this.#tripMain, this.#addPointButtonComponent, RenderPositions.BEFOREEND);
    this.#addPointButtonComponent.setOnAddPointCLick(this.#onAddButtonClick);
  }

  #renderLoading = () => {
    renderElement(this.#listSection, this.#loadingComponent, RenderPositions.AFTERBEGIN);
  }

  #renderError = () => {
    renderElement(this.#listSection, this.#errorComponent, RenderPositions.AFTERBEGIN);
  }


  //общий рендер
  #renderBoard = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      this.#filterPresenter.hide();
      return;
    }

    const points = this.points;
    const allPossisbleOffers = this.allPossisbleOffers;
    const allDestinations = this.allDestinations;
    const pointsCount = points.length;

    this.#renderMenu();
    this.#renderEventsList();
    this.#renderAddPointButton();

    if (pointsCount === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderTripInfo(this.#pointsModel.points);
    this.#renderSort();
    this.#renderPointsList(points, allPossisbleOffers, allDestinations);
  }

  //обработчики
  #onSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  }

  #onAddButtonClick = () => {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newFormPresenter.init(this.allPossisbleOffers, this.allDestinations);
  }

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#addPointButtonComponent.element.removeAttribute('disabled');

      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #onModeChange = () => {
    this.#newFormPresenter.destroy();
    this.#pointsStorage.forEach((presenter) => presenter.resetViewToDefault());
  }

  #onMenuTabClick = (targetTab) => {
    switch (targetTab) {
      case TripTabsTypes.TABLE:
        if (this.#statsComponent) {
          this.#clearBoard();
          this.init();
          this.#statsComponent = null;
        }
        break;
      case TripTabsTypes.STATS:
        if (this.#filterPresenter) {
          this.#filterPresenter.destroy();
          this.#filterPresenter = null;
        }
        this.destroy();
        this.#renderTripInfo(this.#pointsModel.points);
        this.#statsComponent = new StatsView(this.#pointsModel.points);
        renderElement(this.#eventsContainer.element, this.#statsComponent, RenderPositions.AFTERBEGIN);
        break;
    }
  }

  //смена данных
  #onViewAction = async (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsStorage.get(update.id).setViewState(PointPresenterViewState.SAVING);
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointsStorage.get(update.id).setViewState(PointPresenterViewState.ABORTING);
        }
        break;
      case UserAction.ADD_POINT:
        this.#newFormPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
          if (this.#statsComponent) {
            this.#newFormPresenter.destroy();
          }
        } catch(err) {
          this.#newFormPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointsStorage.get(update.id).setViewState(PointPresenterViewState.DELETING);
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointsStorage.get(update.id).setViewState(PointPresenterViewState.ABORTING);
        }
        break;
    }
  }

  #onModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointsStorage.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
      case UpdateType.ERROR:
        this.destroy();
        remove(this.#loadingComponent);
        this.#filterPresenter.hide();
        this.#renderError();
        break;
    }
  }

  //другие методы
  #clearBoard = ({resetSortType = false} = {}) => {
    this.#pointsStorage.forEach((presenter) => presenter.destroy());
    this.#pointsStorage.clear();
    this.#newFormPresenter.destroy();

    remove(this.#sortComponent);

    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
    }

    if (this.#tripInfoComponent) {
      remove(this.#tripInfoComponent);
    }

    if (this.#statsComponent) {
      remove(this.#statsComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  destroy = () => {
    this.#clearBoard({resetSortType: true});

    this.#pointsModel.removeObserver(this.#onModelEvent);
    this.#filterModel.removeObserver(this.#onModelEvent);
  }
}

export default TripPresenter;
