import FiltersView from '../view/filters-view.js';
import {RenderPositions, renderElement, remove, replace} from '../utils/render.js';
import {UpdateType, FilterType} from '../utils/constants.js';
import {filterFunctional} from '../utils/filter.js';

class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #pointsModel = null;

  #filterComponent = null;

  constructor(filterContainer, filterModel, pointsModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#onModelEvent);
    this.#filterModel.addObserver(this.#onModelEvent);

    if (this.#filterComponent !== null) {
      remove(this.#filterComponent);
      this.#filterComponent = null;
    }
  }

  get filters() {
    return [
      {
        filterType: FilterType.EVERYTHING,
        title: 'Everything',
      },
      {
        filterType: FilterType.FUTURE,
        title: 'Future',
      },
      {
        filterType: FilterType.PAST,
        title: 'Past',
      },
    ];
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    const points = this.#pointsModel.points;
    const filteredFuture = filterFunctional[FilterType.FUTURE](points);
    const filteredPast = filterFunctional[FilterType.PAST](points);

    const amountOfFilteredPoints = {
      filteredFuture: filteredFuture,
      filteredPast: filteredPast
    };

    this.#filterComponent = new FiltersView(filters, this.#filterModel.filter, amountOfFilteredPoints);
    this.#filterComponent.setOnFilterTypeChange(this.#onFilterTypeChange);

    if (prevFilterComponent === null) {
      renderElement(this.#filterContainer, this.#filterComponent, RenderPositions.BEFOREEND);
      return;
    }

    replace(this.#filterContainer, this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #onModelEvent = () => {
    this.init();
  }

  #onFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  destroy = () => {
    remove(this.#filterComponent);
    this.#filterComponent = null;

    this.#pointsModel.removeObserver(this.#onModelEvent);
    this.#filterModel.removeObserver(this.#onModelEvent);

    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
  }

  hide = () => {
    this.#filterComponent.element.classList.add('visually-hidden');
  }
}

export default FilterPresenter;
