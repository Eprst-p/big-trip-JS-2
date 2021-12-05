import AbstractView from './abstract-view.js';

const createNoPointsTemplate = (message) => (
  `<p class="trip-events__msg">${message}</p>`
);

const noPointsMessages = {
  everything: 'Click New Event to create your first point',
  future: 'There are no future events now',
  past: 'There are no past events now'
};

class NoPointsView extends AbstractView {
  #filterValue = null;

  constructor(filterValue) {
    super();
    this.#filterValue = filterValue;
  }

  get template() {
    return createNoPointsTemplate(noPointsMessages[this.#filterValue]);
  }
}

export default NoPointsView;
