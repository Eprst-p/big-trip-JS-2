import {RenderPositions, renderElement} from '../utils/render.js';
import MenuView from '../view/menu-view.js';
import NoPointsView from '../view/no-points-view.js';
import FiltersView from '../view/filters-view.js';
import SortView from '../view/sort-view.js';
import TripInfoView from '../view/trip-info-view.js';
import PointPresenter from './point-presenter.js';

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

  #pointPresenter = new Map();

  constructor(tripInfo, menu, filters, listSection, eventsContainer) {
    this.#tripInfoContainer = tripInfo;
    this.#menuContainer = menu;
    this.#filtersContainer = filters;
    this.#listSection = listSection;
    this.#ulContainer = eventsContainer;
  }

  init = (allPoints) => {
    this.#points = [...allPoints];

    this.#renderMenu();
    this.#renderFilters();
    this.#renderSort();
    this.#renderResultPointList();
  }


  #renderMenu = () => {
    renderElement(this.#menuContainer, this.#menuComponent, RenderPositions.BEFOREEND);
  }

  #renderFilters = () => {
    renderElement(this.#filtersContainer, this.#filtersComponent, RenderPositions.BEFOREEND);
  }

  #renderSort = () => {
    renderElement(this.#listSection, this.#sortComponent, RenderPositions.AFTERBEGIN);
  }

  #renderPoint = (container, pointData) => {
    const pointPresenter = new PointPresenter(container);
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
    if (this.#pointsCount > 0) {
      this.#renderTripInfo(this.#points);

      for (let i = 0; i < this.#pointsCount; i++) {
        this.#renderPoint(this.#ulContainer, this.#points[i]);
      }
    }

    if (this.#pointsCount === 0) { //просто дефолтное отображение при первой загрузке
      this.#renderNoPoints('everything');
    }
  }

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

}

export default TripPresenter;
