import FiltersView from '../view/filters-view.js';
import {RenderPositions, renderElement, remove, replace} from '../utils/render.js';
import {UpdateType, FilterType} from '../utils/constants.js';

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

    this.#filterComponent = new FiltersView(filters, this.#filterModel.filter);
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
}

export default FilterPresenter;
