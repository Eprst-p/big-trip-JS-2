import AbstractView from './abstract-view.js';


const createUlTemplate = () => (
  `<ul class="trip-events__list">
    </ul>`
);

class ContainerForPointsView extends AbstractView  {
  get template() {
    return createUlTemplate();
  }
}

export default ContainerForPointsView;
