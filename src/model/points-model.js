import AbstractObservable from '../utils/abstract-observable.js';

class PointsModel  extends AbstractObservable {
  #points = [];
  #apiService = null;

  constructor(apiService) {
    super();
    this.#apiService = apiService;

    this.#apiService.points.then((points) => {
      console.log(points);
      console.log(points.map(this.#adaptToClient));
    });
  }

  set points(points) {
    this.#points = [...points];
  }

  get points() {
    return this.#points;
  }

  updatePoint = (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint = (updateType, update) => {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  deletePoint = (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }

  #adaptToClient = (point) => {
    const adaptedTask = {...point,
      basePrice: point['base_price'], //!== null ? new Date(task['due_date']) : task['due_date'], // На клиенте дата хранится как экземпляр Date
      dateFrom: point['date_from'],
      dateTo: point['date_to'],
      isFavorite: point['is_favorite'],
    };

    // Ненужные ключи мы удаляем
    delete adaptedTask['base_price'];
    delete adaptedTask['date_from'];
    delete adaptedTask['date_to'];
    delete adaptedTask['is_favorite'];

    return adaptedTask;
  }
}

export default PointsModel;
