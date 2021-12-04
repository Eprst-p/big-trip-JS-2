import {RenderPositions, renderElement} from './utils/render.js';
import MenuView from './view/menu-view.js';
import NoPointsView from './view/no-points-view.js';
import FiltersView from './view/filters-view.js';
import SortView from './view/sort-view.js';
import ContainerForPointsView from './view/container-for-points-view.js';
import PointView from './view/point-view.js';
import FormView from './view/form-view.js';
import TripInfoView from './view/trip-info-view.js';
import {generatePoint} from './mock/gen-data.js';

const POINTS_COUNT = 0;

const points = Array.from({length: POINTS_COUNT}, generatePoint);

const headerContainer = document.querySelector('.page-header');
const tripInfoContainer = headerContainer.querySelector('.trip-main');
const menuContainer = headerContainer.querySelector('.trip-controls__navigation');
const filtersContainer = headerContainer.querySelector('.trip-controls__filters');

renderElement(menuContainer, new MenuView().element, RenderPositions.BEFOREEND);

const filtersElement = new FiltersView().element;

renderElement(filtersContainer, filtersElement, RenderPositions.BEFOREEND);

const contentSectionElement = document.querySelector('.trip-events');

renderElement(contentSectionElement, new SortView().element, RenderPositions.BEFOREEND);
renderElement(contentSectionElement, new ContainerForPointsView().element, RenderPositions.BEFOREEND);


const renderPoint = (container, pointData) => {
  const pointElement = new PointView(pointData);
  const pointEditForm = new FormView('editForm', pointData);

  const replacePointToForm = () => {
    container.replaceChild(pointEditForm.element, pointElement.element);
  };

  const replaceFormToPoint = () => {
    container.replaceChild(pointElement.element, pointEditForm.element);
  };

  const pointArrow = pointElement.element.querySelector('.event__rollup-btn');
  const formArrow = pointEditForm.element.querySelector('.event__rollup-btn');
  const formTag = pointEditForm.element.closest('form');


  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointArrow.addEventListener('click', () => {
    replacePointToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  formTag.addEventListener('submit', (evt) => { //нужно добавлять позже батону тип submit по идее, чтобы работало
    evt.preventDefault();
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  formArrow.addEventListener('click', () => {
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  renderElement(container, pointElement.element, RenderPositions.BEFOREEND);
};

const ulList = contentSectionElement.querySelector('.trip-events__list');


if (POINTS_COUNT > 0) {
  renderElement(tripInfoContainer, new TripInfoView(points).element, RenderPositions.AFTERBEGIN);

  for (let i = 0; i < POINTS_COUNT; i++) {
    renderPoint(ulList, points[i]);
  }
}

const noPointsMessages = {
  everything: 'Click New Event to create your first point',
  future: 'There are no future events now',
  past: 'There are no past events now'
};

if (POINTS_COUNT === 0) { //просто дефолтное отображение при первой загрузке
  renderElement(ulList, new NoPointsView(noPointsMessages.everything).element, RenderPositions.AFTERBEGIN);
}

// блок с логикой сменой фильтров
const onFilterChange = (evt) => {

  const filterClickArea = evt.target.closest('.trip-filters__filter');
  const checkFilterId = (filterId) => filterClickArea.querySelector(filterId);


  if (checkFilterId('#filter-everything')) {
    //тут  должен быть полный список точек маршрута
    if (POINTS_COUNT === 0) {
      ulList.innerHTML = '';
      renderElement(ulList, new NoPointsView(noPointsMessages.everything).element, RenderPositions.AFTERBEGIN);
    }
  }
  if (checkFilterId('#filter-future')) {
    //тут  должен быть точки после текущей даты
    if (POINTS_COUNT === 0) {
      ulList.innerHTML = '';
      renderElement(ulList, new NoPointsView(noPointsMessages.future).element, RenderPositions.AFTERBEGIN);
    }
  }
  if (checkFilterId('#filter-past')) {
    //тут  должен быть точки до текущей даты
    if (POINTS_COUNT === 0) {
      ulList.innerHTML = '';
      renderElement(ulList, new NoPointsView(noPointsMessages.past).element, RenderPositions.AFTERBEGIN);
    }
  }
};

filtersElement.addEventListener('change', onFilterChange);


//const listElements = ulList.querySelectorAll('.trip-events__item'); //вроде не нужен пока


//пример для добавления формы, чтоб не забыть
//renderElement(listElements[1], new FormView().element, RenderPositions.AFTERBEGIN);//форма новой точки маршрута, данные по умолчанию. Рисуем на втором элементе списка - чтоб не слипалось

