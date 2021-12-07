import {RenderPositions, renderElement, replace} from './utils/render.js';
import PointView from './view/point-view.js';
import FormView from './view/form-view.js';
import MenuView from './view/menu-view.js';
import NoPointsView from './view/no-points-view.js';
import FiltersView from './view/filters-view.js';
import SortView from './view/sort-view.js';
import EventsList from './view/events-list.js';
import TripInfoView from './view/trip-info-view.js';
import {generatePoint} from './mock/gen-data.js';

const POINTS_COUNT = 20;

const points = Array.from({length: POINTS_COUNT}, generatePoint);

const headerContainer = document.querySelector('.page-header');
const tripInfoContainer = headerContainer.querySelector('.trip-main');
const menuContainer = headerContainer.querySelector('.trip-controls__navigation');
const filtersContainer = headerContainer.querySelector('.trip-controls__filters');

renderElement(menuContainer, new MenuView(), RenderPositions.BEFOREEND);

const filtersElement = new FiltersView().element;

renderElement(filtersContainer, filtersElement, RenderPositions.BEFOREEND);

const contentSectionElement = document.querySelector('.trip-events');

renderElement(contentSectionElement, new SortView(), RenderPositions.BEFOREEND);
renderElement(contentSectionElement, new EventsList(), RenderPositions.BEFOREEND);

//отрисовка точки
const renderPoint = (container, pointData) => {
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
};

const ulList = contentSectionElement.querySelector('.trip-events__list');

if (POINTS_COUNT > 0) {
  renderElement(tripInfoContainer, new TripInfoView(points), RenderPositions.AFTERBEGIN);

  for (let i = 0; i < POINTS_COUNT; i++) {
    renderPoint(ulList, points[i]);
  }
}

if (POINTS_COUNT === 0) { //просто дефолтное отображение при первой загрузке
  renderElement(ulList, new NoPointsView('everything'), RenderPositions.AFTERBEGIN);
}

// блок с логикой сменой фильтров
const onFilterChange = (evt) => {
  if (POINTS_COUNT === 0) {
    ulList.innerHTML = '';
    renderElement(ulList, new NoPointsView(evt.target.value), RenderPositions.AFTERBEGIN);
  }
  if (evt.target.value === 'everything') {
    //отображение всех точек
  }
  if (evt.target.value === 'future') {
    //отображение точек после теккущей даты
  }
  if (evt.target.value === 'past') {
    //отображение точек до текущей даты
  }
};

filtersElement.addEventListener('change', onFilterChange);


//const listElements = ulList.querySelectorAll('.trip-events__item'); //вроде не нужен пока


//пример для добавления формы, чтоб не забыть
//renderElement(listElements[1], new FormView().element, RenderPositions.AFTERBEGIN);//форма новой точки маршрута, данные по умолчанию. Рисуем на втором элементе списка - чтоб не слипалось

