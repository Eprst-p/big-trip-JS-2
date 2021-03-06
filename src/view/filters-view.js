import AbstractView from './abstract-view.js';

const createFiltersTemplate = (filters, currentFilterType, amountOfFilteredPoints) => (
  `<form class="trip-filters" action="#" method="get">
    ${filters.map((filter) => `
    <div class="trip-filters__filter">
      <input
        id="filter-${filter.filterType}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        value="${filter.filterType}"
        ${filter.filterType === currentFilterType ? 'checked' : ''}
        ${amountOfFilteredPoints[filter.filterType].length === 0 ? 'disabled' : ''}
      >
      <label class="trip-filters__filter-label" for="filter-${filter.filterType}">${filter.title}</label>
    </div>
    `).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

class FiltersView extends AbstractView  {
  #filters = null;
  #currentFilterType = null;
  #amountOfFilteredPoints = null;

  constructor(filters, currentFilterType, amountOfFilteredPoints) {
    super();
    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
    this.#amountOfFilteredPoints = amountOfFilteredPoints;
  }

  get template() {
    return createFiltersTemplate(this.#filters, this.#currentFilterType, this.#amountOfFilteredPoints);
  }

  setOnFilterTypeChange = (callback) => {
    this._callbacksStorage.filterTypeChange = callback;
    this.element.addEventListener('change', this.#onFilterTypeChange);
  }

  #onFilterTypeChange= (evt) => {
    evt.preventDefault();
    this._callbacksStorage.filterTypeChange(evt.target.value);
  }
}

export default FiltersView;
