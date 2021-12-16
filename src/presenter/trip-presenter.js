import {RenderPositions, renderElement} from '../utils/render.js';
import {updateItem, sortItemsByDuration, sortItemsByPrice} from '../utils/common.js';
import MenuView from '../view/menu-view.js';
import NoPointsView from '../view/no-points-view.js';
import FiltersView from '../view/filters-view.js';
import SortView from '../view/sort-view.js';
import TripInfoView from '../view/trip-info-view.js';
import PointPresenter from './point-presenter.js';
import {SortType}  from '../utils/constants.js';

const POINTS_COUNT = 20;

class TripPresenter {
  #tripInfoContainer = null;
  #menuContainer = null;
  #filtersContainer = null;
  #listSection = null;
  #ulContainer = null;

  #menuComponent = new MenuView();
  #filtersComponent = new FiltersView();
  #sortComponent = new SortView();

  #pointsCount = POINTS_COUNT;
  #points = [];
  #deafaultPoints = [];
  #pointPresenter = new Map();
  #currentSortType = SortType.DAY;

  constructor(tripInfo, menu, filters, listSection, eventsContainer) {
    this.#tripInfoContainer = tripInfo;
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
      case SortType.DURATION_UP:
        this.#points.sort(sortItemsByDuration);
        break;
      case SortType.PRICE_UP:
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
    renderElement(this.#tripInfoContainer, new TripInfoView(allPoints), RenderPositions.AFTERBEGIN);
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
