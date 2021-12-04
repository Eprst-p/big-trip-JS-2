import {createElementMarkup} from '../utils/render.js';

const createNoPointsTemplate = (message) => (
  `<p class="trip-events__msg">${message}</p>`
);

class NoPointsView {
  #element = null;
  #message = null;

  constructor(message) {
    this.#message = message;
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

export default NoPointsView;
