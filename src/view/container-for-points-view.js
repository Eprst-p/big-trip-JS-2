import {createElementMarkup} from '../utils/render.js';

const createUlTemplate = () => (
  `<ul class="trip-events__list">
    </ul>`
);

class ContainerForPointsView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElementMarkup(this.template);
    }

    return this.#element;
  }

  get template() {
    return createUlTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}

export default ContainerForPointsView;
