import {generatePoint} from './mock/gen-data.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import {POINTS_COUNT} from './utils/constants.js';

const points = Array.from({length: POINTS_COUNT}, generatePoint);

const headerContainer = document.querySelector('.page-header');
const tripMain = headerContainer.querySelector('.trip-main');
const menuContainer = tripMain.querySelector('.trip-controls__navigation');
const filtersContainer = tripMain.querySelector('.trip-controls__filters');
const contentSectionElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
pointsModel.points = points;

const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(tripMain, menuContainer, contentSectionElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(filtersContainer, filterModel, pointsModel);

filterPresenter.init();
tripPresenter.init();
