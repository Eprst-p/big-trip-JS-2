const POINT_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'CheckIn', 'Sightseeing', 'Restaurant'];

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
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

const SORT_ITEMS = [
  {
    type: SortType.DAY,
    tittle: 'Day',
    isChecked: 'checked',
  },
  {
    type: 'event',
    tittle: 'Event',
    isChecked: 'disabled',
  },
  {
    type: SortType.TIME,
    tittle: 'Time',
    isChecked: '',
  },
  {
    type: SortType.PRICE,
    tittle: 'Price',
    isChecked: '',
  },
  {
    type: 'offer',
    tittle: 'Offers',
    isChecked: 'disabled',
  },
];

export {POINT_TYPES, PRICES,  SORT_ITEMS, SortType, OFFERS_BY_TYPE};
