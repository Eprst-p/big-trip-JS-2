import {generatePoint} from './mock/gen-data.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';
import {POINTS_COUNT} from './utils/constants.js';

const points = Array.from({length: POINTS_COUNT}, generatePoint);

const headerContainer = document.querySelector('.page-header');
const tripMain = headerContainer.querySelector('.trip-main');
const menuContainer = tripMain.querySelector('.trip-controls__navigation');
const filtersContainer = tripMain.querySelector('.trip-controls__filters');
/*
const filtersElement = new FiltersView().element;

renderElement(filtersContainer, filtersElement, RenderPositions.BEFOREEND);
*/
const contentSectionElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
pointsModel.points = points;

/*
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
*/

const tripPresenter = new TripPresenter(tripMain, menuContainer, filtersContainer, contentSectionElement, pointsModel);

tripPresenter.init(points);

