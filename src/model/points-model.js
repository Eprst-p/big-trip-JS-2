import AbstractObservable from '../utils/abstract-observable.js';

class PointsModel  extends AbstractObservable {
  #points = [];

  set points(points) {
    this.#points = [...points];
  }

  get points() {
    return this.#points;
  }
}

export default PointsModel;
