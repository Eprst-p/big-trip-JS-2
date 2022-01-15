import {createElementMarkup} from '../utils/render.js';

const SHAKE_ANIMATION_TIMEOUT = 600;

class AbstractView {
  #element = null;
  _callbacksStorage = {};

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

  shake(callback) {
    this.element.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      this.element.style.animation = '';
      callback();
    }, SHAKE_ANIMATION_TIMEOUT);
  }
}

export default AbstractView;
