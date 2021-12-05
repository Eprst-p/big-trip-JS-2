import {createElementMarkup} from '../utils/render.js';


class AbstractView {
  #element = null;

  constructor() {
    if (new.target === AbstractView) {
      throw new Error('Can\'t create instance from Abstract class');
    }
  }

  get element() {
    if (!this.#element) {
      this.#element = createElementMarkup(this.template);
    }
    return this.#element;
  }

  get template() {
    throw new Error('You forget implement "get template" method');
  }

  removeElement() {
    this.#element = null;
  }
}

export default AbstractView;
