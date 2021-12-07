import AbstractView from './abstract-view.js';

const createUlTemplate = () => (
  `<ul class="trip-events__list">
    </ul>`
);

class EventsList extends AbstractView  {
  get template() {
    return createUlTemplate();
  }
}

export default EventsList;
