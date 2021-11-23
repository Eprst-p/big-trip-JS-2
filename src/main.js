import {RenderPositions, renderTemplate} from './render.js';
import {createMenuTemplate} from './view/menu-view.js';
import {createFiltersTemplate} from './view/filters-view.js';
import {createSortTemplate} from './view/sort-view.js';
import {createContentTemplate} from './view/content-view.js';
import {createFormEditTemplate} from './view/form-edit-view.js';


const headerElement = document.querySelector('.page-header');
const divForNavElement = headerElement.querySelector('.trip-controls__navigation');
const divForFiltersElement = headerElement.querySelector('.trip-controls__filters');

renderTemplate(divForNavElement, createMenuTemplate(), RenderPositions.BEFOREEND);
renderTemplate(divForFiltersElement, createFiltersTemplate(), RenderPositions.BEFOREEND);

const mainElement = document.querySelector('.page-main');

renderTemplate(mainElement, createSortTemplate(), RenderPositions.BEFOREEND);
renderTemplate(mainElement, createContentTemplate(), RenderPositions.BEFOREEND);

const ulList = mainElement.querySelector('.trip-events__list');
const listElements = ulList.querySelectorAll('.trip-events__item');

renderTemplate(listElements[1], createFormEditTemplate(), RenderPositions.BEFOREEND); //пока просто во второй элемент вставляется, без перерисовки самого li

