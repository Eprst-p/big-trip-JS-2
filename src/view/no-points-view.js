import {createElementMarkup} from '../utils/render.js';

const createNoPointsTemplate = (message) => (
  `<p class="trip-events__msg">${message}</p>`
);

class NoPointsView {
  #element = null;
  #message = null;

  constructor(checkedFilterValue) {
    if (checkedFilterValue === 'everything') {
      this.#message = 'Click New Event to create your first point';
    }
    if (checkedFilterValue === 'future') {
      this.#message = 'There are no future events now';
    }
    if (checkedFilterValue === 'past') {
      this.#message = 'There are no past events now';
    }
  }

  get element() {
    if (!this.#element) {
      this.#element = createElementMarkup(this.template);
    }

    return this.#element;
  }

  get template() {
    return createNoPointsTemplate(this.#message);
  }

  removeElement() {
    this.#element = null;
  }
}


export {NoPointsView};
