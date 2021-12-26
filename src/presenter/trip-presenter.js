import {RenderPositions, renderElement, remove} from '../utils/render.js';
import {sortItemsByTime, sortItemsByPrice} from '../utils/common.js';
import MenuView from '../view/menu-view.js';
import FormView from '../view/form-view.js';
import NoPointsView from '../view/no-points-view.js';
import FiltersView from '../view/filters-view.js';
import SortView from '../view/sort-view.js';
import EventsList from '../view/events-list-view.js';
import TripInfoView from '../view/trip-info-view.js';
import AddPointButtonView from '../view/add-point-view';
import PointPresenter from './point-presenter.js';
import {SortType, POINTS_COUNT, UserAction, UpdateType} from '../utils/constants.js';

class TripPresenter {
  #tripMain = null;
  #menuContainer = null;
  #filtersContainer = null;
  #listSection = null;
  #ulContainer = null;

  #menuComponent = new MenuView();
  #filtersComponent = new FiltersView();
  #sortComponent = null;
  #addPointButtonComponent = new AddPointButtonView();
  #eventsContainer = new EventsList();
  #newFormComponent = null;
  #noPointsComponent = null;

  #pointsModel = null;

  #pointsCount = POINTS_COUNT;
  #pointsStorage = new Map();
  #currentSortType = SortType.DAY;


  constructor(tripMain, menu, filters, listSection, pointsModel) {
    this.#tripMain = tripMain;
    this.#menuContainer = menu;
    this.#filtersContainer = filters;
    this.#listSection = listSection;

    this.#pointsModel = pointsModel;
    this.#pointsModel.addObserver(this.#onModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.TIME:
        return [...this.#pointsModel.points].sort(sortItemsByTime);
      case SortType.PRICE:
        return [...this.#pointsModel.points].sort(sortItemsByPrice);
    }
    return this.#pointsModel.points;
  }

  init = () => {
    this.#renderTripInfo(this.#pointsModel.points);
    this.#renderBoard();
  }

  //рендеры
  #renderMenu = () => {
    renderElement(this.#menuContainer, this.#menuComponent, RenderPositions.BEFOREEND);
  }

  #renderFilters = () => {
    renderElement(this.#filtersContainer, this.#filtersComponent, RenderPositions.BEFOREEND);
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
    renderElement(this.#tripMain, new TripInfoView(allPoints), RenderPositions.AFTERBEGIN);
  }

  #renderNoPoints = (filterValue) => {
    this.#noPointsComponent = new NoPointsView(filterValue);
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
    const pointsCount = points.lenght;

    this.#renderMenu();
    this.#renderFilters();
    this.#renderEventsList();
    this.#renderAddPointButton();

    if (pointsCount === 0) {
      this.#renderNoPoints('everything');
      return;
    }

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
    this.#newFormComponent = new FormView();
    renderElement(this.#eventsContainer.element, this.#newFormComponent, RenderPositions.AFTERBEGIN);
    remove(this.#sortComponent);
    this.#renderSort();
    this.#onSortTypeChange(SortType.DAY);
    remove(this.#filtersComponent);
    this.#renderFilters();
    // + тут нужно возвращение поведения фильтров к дефолту (everything) (пока их нет)
    this.#onModeChange();

    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#newFormComponent.setOnCancelBtnClick(this.#onCancelBtnClick);
    this.#newFormComponent.setOnFormSubmit(this.#newFormSubmit);
    this.#newFormComponent.setDatepicker();
  }

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      remove(this.#newFormComponent);
      this.#addPointButtonComponent.element.removeAttribute('disabled');

      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #onCancelBtnClick = () => {
    remove(this.#newFormComponent);
    this.#addPointButtonComponent.element.removeAttribute('disabled');

    document.removeEventListener('keydown', this.#onEscKeyDown);
  }

  #newFormSubmit = () => {//пока делает тоже, что и cancel
    remove(this.#newFormComponent);
    this.#addPointButtonComponent.element.removeAttribute('disabled');

    document.removeEventListener('keydown', this.#onEscKeyDown);
  }

  #onModeChange = () => {
    this.#pointsStorage.forEach((presenter) => presenter.resetViewToDefault());
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

    remove(this.#sortComponent);
    remove(this.#noPointsComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }
}

export default TripPresenter;
