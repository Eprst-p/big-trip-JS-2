import AbstractView from './abstract-view.js';

class SmartView extends AbstractView {
  _data = {};

  updateData = (update, noRerenderElement) => {
    if (!update) {
      return;
    }

    this._data = {...this._data, ...update};

    if (noRerenderElement) {
      return;
    }

    this.updateElement();
  }

  updateElement = () => {
    const prevElement = this.element;
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.element;

    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
  }

  restoreHandlers = () => {
    throw new Error('Abstract method not implemented: restoreHandlers');
  }
}

export default SmartView;
