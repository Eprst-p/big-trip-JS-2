import AbstractView from './abstract-view.js';

const noPointsMessages = {
  everything: 'Click New Event to create your first point',
  future: 'There are no future events now',
  past: 'There are no past events now'
};

const createNoPointsTemplate = (filterType) => {
  const message = noPointsMessages[filterType];

  return (
    `<p class="trip-events__msg">${message}</p>`
  );
};

class NoPointsView extends AbstractView {

  constructor(data) {
    super();
    this._data = data;
  }

  get template() {
    return createNoPointsTemplate(this._data);
  }
}

export default NoPointsView;
