const POINT_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const BAR_HEIGHT = 85;

const SortType = {
  DAY: 'sort-day',
  TIME: 'sort-time',
  PRICE: 'sort-price',
};

const SORT_ITEMS = [
  {
    type: 'day',
    title: 'Day',
    isDisabled: false,
  },
  {
    type: 'event',
    title: 'Event',
    isDisabled: true,
  },
  {
    type: 'time',
    title: 'Time',
    isDisabled: false,
  },
  {
    type: 'price',
    title: 'Price',
    isDisabled: false,
  },
  {
    type: 'offer',
    title: 'Offers',
    isDisabled: true,
  },
];

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  ERROR: 'ERROR',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const TripTabsTypes = {
  TABLE: 'table',
  STATS: 'stats',
};

const FORM_TYPES = {
  EDIT_FORM: 'editForm',
  NEW_FORM: 'newForm',
};

const ERRORS = {
  NO_OFFERS: 'NO_OFFERS',
  NO_DESTINATIONS: 'NO_DESTINATIONS',
};

const MESSAGES = {
  LOADING: 'Loading...',
  ERROR: 'Something is going wrong',
};

const State = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
  ABORTING: 'ABORTING',
};


export {POINT_TYPES, SORT_ITEMS, SortType, UserAction, UpdateType, FilterType, TripTabsTypes, BAR_HEIGHT, FORM_TYPES, ERRORS, MESSAGES, State};
