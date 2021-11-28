import {RenderPositions, renderTemplate} from './utils/render.js';
import {createMenuTemplate} from './view/menu-view.js';
import {createFiltersTemplate} from './view/filters-view.js';
import {createSortTemplate} from './view/sort-view.js';
import {createUlTemplate} from './view/container-for-points-view.js';
import {createLiTemplate} from './view/rout-point-view.js';
import {createFormTemplate} from './view/form-view.js';
import {generatePoint} from './mock/gen-point-data.js';


const POINTS_COUNT = 20;

const points = Array.from({length: POINTS_COUNT}, generatePoint);

const headerElement = document.querySelector('.page-header');
const divForNavElement = headerElement.querySelector('.trip-controls__navigation');
const divForFiltersElement = headerElement.querySelector('.trip-controls__filters');

renderTemplate(divForNavElement, createMenuTemplate(), RenderPositions.BEFOREEND);
renderTemplate(divForFiltersElement, createFiltersTemplate(), RenderPositions.BEFOREEND);

const contentSectionElement = document.querySelector('.trip-events');

renderTemplate(contentSectionElement, createSortTemplate(), RenderPositions.BEFOREEND);
renderTemplate(contentSectionElement, createUlTemplate(), RenderPositions.BEFOREEND);

const ulList = contentSectionElement.querySelector('.trip-events__list');

for (let i = 0; i < POINTS_COUNT; i++) {
  renderTemplate(ulList, createLiTemplate(points[i]), RenderPositions.BEFOREEND);
}

//const listElements = ulList.querySelectorAll('.trip-events__item');//пока ну нужен вроде бы список точек

renderTemplate(ulList, createFormTemplate(), RenderPositions.AFTERBEGIN);//форма новой точки маршрута
renderTemplate(ulList, createFormTemplate(), RenderPositions.AFTERBEGIN);//форма редактирования


