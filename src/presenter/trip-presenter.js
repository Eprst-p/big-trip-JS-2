import {RenderPositions, renderElement, remove} from '../utils/render.js';
import {updateItem, sortItemsByTime, sortItemsByPrice} from '../utils/common.js';
import MenuView from '../view/menu-view.js';
import FormView from '../view/form-view.js';
import NoPointsView from '../view/no-points-view.js';
import FiltersView from '../view/filters-view.js';
import SortView from '../view/sort-view.js';
import EventsList from '../view/events-list-view.js';
import TripInfoView from '../view/trip-info-view.js';
import AddPointButtonView from '../view/add-point-view';
import PointPresenter from './point-presenter.js';
import {SortType} from '../utils/constants.js';

const POINTS_COUNT = 20;

class TripPresenter {
  #tripMain = null;
  #menuContainer = null;
  #filtersContainer = null;
  #listSection = null;
  #ulContainer = null;

  #menuComponent = new MenuView();
  #filtersComponent = new FiltersView();
  #sortComponent = new SortView();
  #addPointButtonComponent = new AddPointButtonView();
  #eventsContainer = new EventsList();
  #newFormComponent = null;

  #pointsCount = POINTS_COUNT;
  #points = [];
  #deafaultPoints = [];
  #pointsStorage = new Map();
  #currentSortType = SortType.DAY;


  constructor(tripMain, menu, filters, listSection) {
    this.#tripMain = tripMain;
    this.#menuContainer = menu;
    this.#filtersContainer = filters;
    this.#listSection = listSection;
  }

  init = (allPoints) => {
    this.#points = [...allPoints];
    this.#deafaultPoints = [...allPoints];

    this.#renderMenu();
    this.#renderFilters();
    this.#renderEventsList();
    this.#renderSort();
    this.#renderTripInfo(this.#points);
    this.#renderResultPointList();
    this.#renderAddPointButton();
  }

  #renderMenu = () => {
    renderElement(this.#menuContainer, this.#menuComponent, RenderPositions.BEFOREEND);
  }

  #renderFilters = () => {
    renderElement(this.#filtersContainer, this.#filtersComponent, RenderPositions.BEFOREEND);
  }

  #renderEventsList = () => {
    renderElement(this.#listSection, this.#eventsContainer, RenderPositions.BEFOREEND);
  }

  #onSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderResultPointList();
  }

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.TIME:
        this.#points.sort(sortItemsByTime);
        break;
      case SortType.PRICE:
        this.#points.sort(sortItemsByPrice);
        break;
      default:
        this.#points = [...this.#deafaultPoints];
    }
    this.#currentSortType = sortType;
  }

  #renderSort = () => {
    renderElement(this.#listSection, this.#sortComponent, RenderPositions.AFTERBEGIN);
    this.#sortComponent.setOnSortTypeChange(this.#onSortTypeChange);
  }

  #renderPoint = (container, pointData) => {
    const pointPresenter = new PointPresenter(container, this.#onPointChange, this.#onModeChange);
    pointPresenter.init(pointData);
    this.#pointsStorage.set(pointData.id, pointPresenter);
  }

  #renderTripInfo = (allPoints) => {
    renderElement(this.#tripMain, new TripInfoView(allPoints), RenderPositions.AFTERBEGIN);
  }

  #renderNoPoints = (filterValue) => {
    renderElement(this.#eventsContainer.element, new NoPointsView(filterValue), RenderPositions.AFTERBEGIN);
  }

  #renderResultPointList = () => {
    if (this.#pointsCount === 0) {
      this.#renderNoPoints('everything');//просто дефолтное отображение при первой загрузке
    } else {
      for (let i = 0; i < this.#pointsCount; i++) {
        this.#renderPoint(this.#eventsContainer.element, this.#points[i]);
      }
    }
  }

  #renderAddPointButton = () => {
    renderElement(this.#tripMain, this.#addPointButtonComponent, RenderPositions.BEFOREEND);
    this.#addPointButtonComponent.setOnAddPointCLick(this.#onAddButtonClick);
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

  //пока делает тоже, что и cancel
  #newFormSubmit = () => {
    remove(this.#newFormComponent);
    this.#addPointButtonComponent.element.removeAttribute('disabled');

    document.removeEventListener('keydown', this.#onEscKeyDown);
  }

  #clearPointList = () => {
    this.#pointsStorage.forEach((presenter) => presenter.destroy());
    this.#pointsStorage.clear();
  }

  #onModeChange = () => {
    this.#pointsStorage.forEach((presenter) => presenter.resetViewToDefault());
  }

  //метод, который будет передаваться, а потом и вызываться в маленьком презентере точки, при обновлении данных
  #onPointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#deafaultPoints = updateItem(this.#deafaultPoints, updatedPoint);
    this.#pointsStorage.get(updatedPoint.id).init(updatedPoint);
  }

  //бывший метож для удаления
  /*removeOnePoint =(point) => {
    this.#pointsStorage.delete(point.id);
  }*/
}

export default TripPresenter;
