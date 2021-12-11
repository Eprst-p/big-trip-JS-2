import {RenderPositions, renderElement, replace} from '../utils/render.js';
import PointView from '../view/point-view.js';
import FormView from '../view/form-view.js';
import MenuView from '../view/menu-view.js';
import NoPointsView from '../view/no-points-view.js';
import FiltersView from '../view/filters-view.js';
import SortView from '../view/sort-view.js';
import EventsList from '../view/events-list.js';
import TripInfoView from '../view/trip-info-view.js';

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
  #eventsListComponent = new EventsList();

  #pointsCount = POINTS_COUNT;

  #points = [];

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

  //отрисовка точки
  #renderPoint = (container, pointData) => {
    const pointElement = new PointView(pointData);
    const pointEditForm = new FormView('editForm', pointData);

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replace(container, pointElement, pointEditForm);
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointElement.setOnPointArrowClick(() => {
      replace(container, pointEditForm, pointElement);
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditForm.setOnFormSubmit(() => {
      replace(container, pointElement, pointEditForm);
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditForm.setOnFormArrowClick(() => {
      replace(container, pointElement, pointEditForm);
      document.removeEventListener('keydown', onEscKeyDown);
    });

    renderElement(container, pointElement, RenderPositions.BEFOREEND);
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

}

export default TripPresenter;
