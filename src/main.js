import {RenderPositions, renderTemplate} from './utils/render.js';
import {createMenuTemplate} from './view/menu-view.js';
import {createFiltersTemplate} from './view/filters-view.js';
import {createSortTemplate} from './view/sort-view.js';
import {createUlTemplate} from './view/container-for-points-view.js';
import {createLiTemplate} from './view/rout-point-view.js';
import {createFormAddTemplate} from './view/form-view.js';

const POINTS_COUNT = 3;

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
  renderTemplate(ulList, createLiTemplate(), RenderPositions.BEFOREEND); //li-шки будут одинаковые, я так понял, что пока требуется просто их создать как шаблон
}

const listElements = ulList.querySelectorAll('.trip-events__item');

renderTemplate(listElements[1], createFormAddTemplate(), RenderPositions.BEFOREEND);

