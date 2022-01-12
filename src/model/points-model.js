import AbstractObservable from '../utils/abstract-observable.js';
import {UpdateType} from '../utils/constants.js';


class PointsModel  extends AbstractObservable {
  #points = [];
  #allPossisbleOffers = [];
  #allDestinations = [];
  #apiService = null;

  constructor(apiService) {
    super();
    this.#apiService = apiService;

    this.#apiService.points.then((points) => {
      console.log('server-points :', points);
      console.log('adapted-points :', points.map(this.#adaptToClient));
    });
    this.#apiService.allPossisbleOffers.then((offers) => {
      console.log('offers:', offers);
    });
    this.#apiService.allDestinations.then((allDestinations) => {
      console.log('destinations:', allDestinations);
    });

  }

  /*set points(points) {
    this.#points = [...points];
  }*/

  get points() {
    return this.#points;
  }

  get allPossisbleOffers() {
    return this.#allPossisbleOffers;
  }

  get allDestinations() {
    return this.#allDestinations;
  }


  init = async () => {
    try {
      const points = await this.#apiService.points;
      this.#points = points.map(this.#adaptToClient);
      this.#allPossisbleOffers = await this.#apiService.allPossisbleOffers;
      this.#allDestinations = await this.#apiService.allDestinations;
    } catch(err) {
      this.#points = [];
      this.#allPossisbleOffers = [];
      this.#allDestinations = [];
    }

    this._notify(UpdateType.INIT);
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
    const adaptedPoint = {...point,
      basePrice: point['base_price'], //!== null ? new Date(task['due_date']) : task['due_date'], // На клиенте дата хранится как экземпляр Date
      dateFrom: point['date_from'],
      dateTo: point['date_to'],
      isFavorite: point['is_favorite'],
    };

    // Ненужные ключи мы удаляем
    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];


    return adaptedPoint;
  }
}

export default PointsModel;
