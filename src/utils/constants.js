const POINT_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'CheckIn', 'Sightseeing', 'Restaurant'];

const POINTS_COUNT = 20;

const OFFERS_BY_TYPE = {
  taxi: ['Order Uber'],
  bus: ['Add luggage', 'Choose seats'],
  train: ['Add luggage', 'Switch to comfort class', 'Add meal', 'Choose seats'],
  ship: ['Add luggage', 'Switch to comfort class', 'Add meal', 'Choose seats'],
  drive: ['Rent a car'],
  flight: ['Add luggage', 'Switch to comfort class', 'Add meal', 'Choose seats', 'Travel by train'],
  checkin: ['Add breakfast'],
  sightseeing: ['Book tickets', 'Lunch in city'],
  restaurant: ['Add breakfast', 'Add meal'],

};

const PRICES = ['30', '100', '15', '5', '40']; //четко соответсвует по порядку именам офферов. Теперь уже цены не соответсвуют действительности

const SortType = {
  DAY: 'sort-day',
  TIME: 'sort-time',
  PRICE: 'sort-price',
};

const SORT_ITEMS = [
  {
    type: 'day',
    title: 'Day',
    isDisabled: '',
  },
  {
    type: 'event',
    title: 'Event',
    isDisabled: 'disabled',
  },
  {
    type: 'time',
    title: 'Time',
    isDisabled: '',
  },
  {
    type: 'price',
    title: 'Price',
    isDisabled: '',
  },
  {
    type: 'offer',
    title: 'Offers',
    isDisabled: 'disabled',
  },
];

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export {POINT_TYPES, PRICES,  SORT_ITEMS, SortType, OFFERS_BY_TYPE, POINTS_COUNT, UserAction, UpdateType};
