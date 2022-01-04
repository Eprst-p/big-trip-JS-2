import {RenderPositions, renderElement, remove} from '../utils/render.js';
import {sortItemsByTime, sortItemsByPrice, sortItemsByDay} from '../utils/common.js';
import MenuView from '../view/menu-view.js';
import NoPointsView from '../view/no-points-view.js';
import SortView from '../view/sort-view.js';
import EventsList from '../view/events-list-view.js';
import TripInfoView from '../view/trip-info-view.js';
import AddPointButtonView from '../view/add-point-view';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import {SortType, UserAction, UpdateType, FilterType} from '../utils/constants.js';
import {filterFunctional} from '../utils/filter.js';

class TripPresenter {
  #tripMain = null;
  #menuContainer = null;
  #listSection = null;
  #pointsModel = null;
  #filterModel = null;

  #menuComponent = new MenuView();
  #sortComponent = null;
  #addPointButtonComponent = new AddPointButtonView();
  #eventsContainer = new EventsList();
  #newFormPresenter = null;
  #noPointsComponent = null;
  #tripInfoComponent = null;

  #pointsStorage = new Map();
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;


  constructor(tripMain, menu, listSection, pointsModel, filterModel) {
    this.#tripMain = tripMain;
    this.#menuContainer = menu;
    this.#listSection = listSection;
    this.#newFormPresenter = new NewPointPresenter(this.#eventsContainer.element, this.#onViewAction);

    this.#pointsModel = pointsModel;
    this.#pointsModel.addObserver(this.#onModelEvent);
    this.#filterModel = filterModel;
    this.#filterModel.addObserver(this.#onModelEvent);
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

  init = () => {
    this.#renderBoard();
  }

  //рендеры
  #renderMenu = () => {
    renderElement(this.#menuContainer, this.#menuComponent, RenderPositions.BEFOREEND);
    this.#menuComponent.setOnTableClick(this.#onTableClick);
    this.#menuComponent.setOnStatsClick(this.#onStatsClick);
  }

  #renderEventsList = () => {
    renderElement(this.#listSection, this.#eventsContainer, RenderPositions.BEFOREEND);
  }

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setOnSortTypeChange(this.#onSortTypeChange);
    renderElement(this.#listSection, this.#sortComponent, RenderPositions.AFTERBEGIN);
  }

  #renderPoint = (container, pointData) => {
    const pointPresenter = new PointPresenter(container, this.#onViewAction, this.#onModeChange);
    pointPresenter.init(pointData);
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

  #renderPointsList = (points) => {
    points.forEach((point) => this.#renderPoint(this.#eventsContainer.element, point));
  }

  #renderAddPointButton = () => {
    renderElement(this.#tripMain, this.#addPointButtonComponent, RenderPositions.BEFOREEND);
    this.#addPointButtonComponent.setOnAddPointCLick(this.#onAddButtonClick);
  }

  //общий ренедер
  #renderBoard = () => {
    const points = this.points;
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
    this.#renderPointsList(points);
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
    this.#newFormPresenter.init();
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

  #onTableClick = () => {
    console.log('table');
  }

  #onStatsClick = () => {
    console.log('stats');
  }


  //смена данных
  #onViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
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

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }
}

export default TripPresenter;
