import {createElementMarkup} from '../utils/render.js';

const createNoPointsTemplate = (message) => (
  `<p class="trip-events__msg">${message}</p>`
);

const noPointsMessages = {
  everything: 'Click New Event to create your first point',
  future: 'There are no future events now',
  past: 'There are no past events now'
};

class NoPointsView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElementMarkup(this.template);
    }
    return this.#element;
  }

  get template() {
    return createNoPointsTemplate(noPointsMessages.everything); //пока только одно сообщение, без проверки фильтров
  }

  removeElement() {
    this.#element = null;
  }
}

export default NoPointsView;
