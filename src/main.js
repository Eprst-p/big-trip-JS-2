import {generatePoint} from './mock/gen-data.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import {POINTS_COUNT} from './utils/constants.js';
import ApiService from './utils/api-service.js';

const points = Array.from({length: POINTS_COUNT}, generatePoint);
console.log('mocks:', points);

const AUTHORIZATION = 'Basic asd76fs876gu7fydvhb7adf';
const SERVER_PATH = 'https://16.ecmascript.pages.academy/big-trip';

const headerContainer = document.querySelector('.page-header');
const tripMain = headerContainer.querySelector('.trip-main');
const menuContainer = tripMain.querySelector('.trip-controls__navigation');
const filtersContainer = tripMain.querySelector('.trip-controls__filters');
const contentSectionElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel(new ApiService(SERVER_PATH, AUTHORIZATION));

const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(tripMain, menuContainer, filtersContainer, contentSectionElement, pointsModel, filterModel);

pointsModel.init();
tripPresenter.init();
