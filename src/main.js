import {RenderPositions, renderElement} from './utils/render.js';
import {MenuView} from './view/menu-view.js';
import {FiltersView} from './view/filters-view.js';
import {SortView} from './view/sort-view.js';
import {UlContainerView} from './view/container-for-points-view.js';
import {PointView} from './view/rout-point-view.js';
import {FormView} from './view/form-view.js';
import {TripInfoView} from './view/trip-info-view.js';
import {generatePoint} from './mock/gen-data.js';


const POINTS_COUNT = 20;

const points = Array.from({length: POINTS_COUNT}, generatePoint);

const headerElement = document.querySelector('.page-header');
const tripMainElement = headerElement.querySelector('.trip-main');
const divForNavElement = headerElement.querySelector('.trip-controls__navigation');
const divForFiltersElement = headerElement.querySelector('.trip-controls__filters');

renderElement(tripMainElement, new TripInfoView(points).element, RenderPositions.AFTERBEGIN);
renderElement(divForNavElement, new MenuView().element, RenderPositions.BEFOREEND);

renderElement(divForFiltersElement, new FiltersView().element, RenderPositions.BEFOREEND);

const contentSectionElement = document.querySelector('.trip-events');

renderElement(contentSectionElement, new SortView().element, RenderPositions.BEFOREEND);
renderElement(contentSectionElement, new UlContainerView().element, RenderPositions.BEFOREEND);


const renderPoint = (container, pointObject) => {
  const pointElement = new PointView(pointObject);
  const pointEditForm = new FormView('editForm', pointObject);

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

for (let i = 0; i < POINTS_COUNT; i++) {
  renderPoint(ulList, points[i]);
}

//const listElements = ulList.querySelectorAll('.trip-events__item'); //вроде не нужен пока


//пример для добавления формы, чтоб не забыть
//renderElement(listElements[1], new FormView().element, RenderPositions.AFTERBEGIN);//форма новой точки маршрута, данные по умолчанию. Рисуем на втором элементе списка - чтоб не слипалось


