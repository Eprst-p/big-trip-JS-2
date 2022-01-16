import AbstractView from './abstract-view.js';

const createLoadingTemplate = (message) => (
  `<p class="trip-events__msg">${message}
  </p>`
);

class MessageView extends AbstractView {
  #message = null;

  constructor(message) {
    super();
    this.#message = message;
  }

  get template() {
    return createLoadingTemplate(this.#message);
  }
}

export default MessageView;
