const POINT_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const OFFER_NAMES = ['Add luggage', 'Switch to comfort class', 'Add meal', 'Choose seats', 'Travel by train'];

const PRICES = ['30', '100', '15', '5', '40']; //четко соответсвует по порядку именам офферов

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

const SORT_ITEMS = [
  {
    type: 'day',
    tittle: 'Day',
    isChecked: 'checked',
  },
  {
    type: 'event',
    tittle: 'Event',
    isChecked: 'disabled',
  },
  {
    type: 'time',
    tittle: 'Time',
    isChecked: '',
  },
  {
    type: 'price',
    tittle: 'Price',
    isChecked: '',
  },
  {
    type: 'offer',
    tittle: 'Offers',
    isChecked: 'disabled',
  },
];

export {POINT_TYPES, OFFER_NAMES, PRICES,  SORT_ITEMS, SortType};
