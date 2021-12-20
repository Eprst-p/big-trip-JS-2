import {RenderPositions, renderElement} from '../utils/render.js';
import {updateItem, sortItemsByTime, sortItemsByPrice} from '../utils/common.js';
import MenuView from '../view/menu-view.js';
import FormView from '../view/form-view.js';
import NoPointsView from '../view/no-points-view.js';
import FiltersView from '../view/filters-view.js';
import SortView from '../view/sort-view.js';
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

  #pointsCount = POINTS_COUNT;
  #points = [];
  #deafaultPoints = [];
  #pointPresenter = new Map();
  #currentSortType = SortType.DAY;

  constructor(tripMain, menu, filters, listSection, eventsContainer) {
    this.#tripMain = tripMain;
    this.#menuContainer = menu;
    this.#filtersContainer = filters;
    this.#listSection = listSection;
    this.#ulContainer = eventsContainer;
  }

  init = (allPoints) => {
    this.#points = [...allPoints];
    this.#deafaultPoints = [...allPoints];

    this.#renderMenu();
    this.#renderFilters();
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
    this.#pointPresenter.set(pointData.id, pointPresenter);
  }

  #renderTripInfo = (allPoints) => {
    renderElement(this.#tripMain, new TripInfoView(allPoints), RenderPositions.AFTERBEGIN);
  }

  #renderNoPoints = (filterValue) => {
    renderElement(this.#ulContainer, new NoPointsView(filterValue), RenderPositions.AFTERBEGIN);
  }

  #renderResultPointList = () => {
    if (this.#pointsCount === 0) {
      this.#renderNoPoints('everything');//просто дефолтное отображение при первой загрузке
    } else {
      for (let i = 0; i < this.#pointsCount; i++) {
        this.#renderPoint(this.#ulContainer, this.#points[i]);
      }
    }
  }

  #renderAddPointButton = () => {
    renderElement(this.#tripMain, this.#addPointButtonComponent, RenderPositions.BEFOREEND);
    this.#addPointButtonComponent.setOnAddPointCLick(this.#onAddButtonClick);
  }

  #onAddButtonClick = () => {
    renderElement(this.#ulContainer, new FormView(), RenderPositions.AFTERBEGIN);
  }

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #onModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetViewToDefault());
  }

  //метод, который будет передаваться, а потом и вызываться в маленьком презентере точки, при обновлении данных
  #onPointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#deafaultPoints = updateItem(this.#deafaultPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }
}

export default TripPresenter;
