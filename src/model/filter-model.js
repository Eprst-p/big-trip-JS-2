import AbstractObservable from '../utils/abstract-observable.js';
import {FilterType} from '../utils/constants.js';

class FilterModel extends AbstractObservable {
  #filter = FilterType.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  setFilter = (updateType, filter) => {
    this.#filter = filter;
    this._notify(updateType, filter);
  }
}

export default FilterModel;

