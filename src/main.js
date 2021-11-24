import {RenderPositions, renderTemplate} from './render.js';
import {createMenuTemplate} from './view/menu-view.js';
import {createFiltersTemplate} from './view/filters-view.js';
import {createSortTemplate} from './view/sort-view.js';
import {createUlTemplate, createLiTemplate} from './view/rout-points-view.js';
import {createFormEditTemplate} from './view/point-edit-view.js';
import {createFormAddTemplate} from './view/add-new-point-view.js';

const POINTS_COUNT = 3;

const headerElement = document.querySelector('.page-header');
const divForNavElement = headerElement.querySelector('.trip-controls__navigation');
const divForFiltersElement = headerElement.querySelector('.trip-controls__filters');

renderTemplate(divForNavElement, createMenuTemplate(), RenderPositions.BEFOREEND);
renderTemplate(divForFiltersElement, createFiltersTemplate(), RenderPositions.BEFOREEND);

const mainElement = document.querySelector('.page-main');

renderTemplate(mainElement, createSortTemplate(), RenderPositions.BEFOREEND);
renderTemplate(mainElement, createUlTemplate(), RenderPositions.BEFOREEND);

const ulList = mainElement.querySelector('.trip-events__list');

for (let i = 0; i < POINTS_COUNT; i++) {
  renderTemplate(ulList, createLiTemplate(), RenderPositions.BEFOREEND); //li-шки будут одинаковые, я так понял, что пока требуется просто их создать как шаблон
}

const listElements = ulList.querySelectorAll('.trip-events__item');

renderTemplate(listElements[0], createFormEditTemplate(), RenderPositions.BEFOREEND); //пока просто в первый элемент вставляется, без перерисовки самого li
renderTemplate(listElements[1], createFormAddTemplate(), RenderPositions.BEFOREEND); //а этот во второй элемент

