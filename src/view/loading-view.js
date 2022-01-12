import AbstractView from './abstract-view.js';

const createLoadingTemplate = () => (
  `<p class="trip-events__msg">Loading...
  </p>`
);

class LoadingView extends AbstractView {
  get template() {
    return createLoadingTemplate();
  }
}

export default LoadingView;
