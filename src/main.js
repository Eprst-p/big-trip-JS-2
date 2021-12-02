import {RenderPositions, renderTemplate, renderElement} from './utils/render.js';
import {MenuView} from './view/menu-view.js';
import {FiltersView} from './view/filters-view.js';
import {SortView} from './view/sort-view.js';
import {UlContainerView} from './view/container-for-points-view.js';
import {createLiTemplate} from './view/rout-point-view.js';
import {createFormTemplate} from './view/form-view.js';
import {createTipInfoTemplate} from './view/trip-info-view.js';
import {generatePoint} from './mock/gen-data.js';


const POINTS_COUNT = 20;

const points = Array.from({length: POINTS_COUNT}, generatePoint);

const headerElement = document.querySelector('.page-header');
const tripMainElement = headerElement.querySelector('.trip-main');
const divForNavElement = headerElement.querySelector('.trip-controls__navigation');
const divForFiltersElement = headerElement.querySelector('.trip-controls__filters');

renderTemplate(tripMainElement, createTipInfoTemplate(points), RenderPositions.AFTERBEGIN);
renderElement(divForNavElement, new MenuView().element, RenderPositions.BEFOREEND);

renderElement(divForFiltersElement, new FiltersView().element, RenderPositions.BEFOREEND);

const contentSectionElement = document.querySelector('.trip-events');

renderElement(contentSectionElement, new SortView().element, RenderPositions.BEFOREEND);
renderElement(contentSectionElement, new UlContainerView().element, RenderPositions.BEFOREEND);

const ulList = contentSectionElement.querySelector('.trip-events__list');

for (let i = 0; i < POINTS_COUNT; i++) {
  renderTemplate(ulList, createLiTemplate(points[i]), RenderPositions.BEFOREEND);
}

const listElements = ulList.querySelectorAll('.trip-events__item');


renderTemplate(listElements[1], createFormTemplate(), RenderPositions.AFTERBEGIN);//форма новой точки маршрута, данные по умолчанию. Рисуем на втором элементе списка - чтоб не слипалось
renderTemplate(ulList, createFormTemplate('editForm', points[0]), RenderPositions.AFTERBEGIN);//форма редактирования, рисует по данным с первой точки маршрута


