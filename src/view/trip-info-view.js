import AbstractView from './abstract-view.js';
import {getDateInDayjs, getDateInFormat} from '../utils/time-and-date.js';
import he from 'he';

const createTipInfoTemplate = (allPoints) => {
  const allCities = allPoints.map((point) => point.destination.name);
  const uniqueCities = new Set(allCities);
  const cities = Array.from(uniqueCities);
  const cityCount = uniqueCities.size;

  const findLastCity = () => {
    for (let i = allPoints.length - 1; i >= 0; i-- ) {
      const currentCity = allPoints[i].destination.name;

      if (uniqueCities.has(currentCity)) {
        return currentCity;
      }
    }
  };

  const startCity = cities[0];
  const lastCity = findLastCity();

  const findLastDate = () => {
    for (let i = allPoints.length - 1; i >= 0; i-- ) {
      if (allPoints[i].destination.name === lastCity) {
        return allPoints[i].dateTo;
      }
    }
  };

  const startDayjs = getDateInDayjs(allPoints[0].dateFrom);
  const startDate = getDateInFormat(startDayjs, 'DD MMM');
  const lastDayjs = getDateInDayjs(findLastDate());
  const lastDate = getDateInFormat(lastDayjs, 'DD MMM');

  let totalPrice = 0;
  allPoints.forEach((point) => {
    let offersPrice = 0;
    point.offers.forEach((offer) => {
      offersPrice += offer.price;
    });

    totalPrice += +point.basePrice + offersPrice;
  });

  const createCityWritting = () => {

    if (cityCount > 3) {
      return `<h1 class="trip-info__title">${he.encode(startCity)} &mdash; ... &mdash; ${he.encode(lastCity)}</h1>`;
    }
    if (cityCount === 3) {
      return `<h1 class="trip-info__title">${he.encode(startCity)} &mdash; ${he.encode(cities[1])} &mdash; ${he.encode(lastCity)}</h1>`;
    }
    if (cityCount === 2) {
      return `<h1 class="trip-info__title">${he.encode(startCity)} &mdash; ${he.encode(lastCity)}</h1>`;
    }
    if (cityCount === 1) {
      return `<h1 class="trip-info__title">${he.encode(startCity)}</h1>`;
    }
  };

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        ${createCityWritting()}

        <p class="trip-info__dates">${startDate}&nbsp;&mdash;&nbsp;${lastDate}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${+totalPrice}</span>
      </p>
    </section>`
  );
};

class TripInfoView extends AbstractView {
  #allPoints = null;

  constructor(allPoints) {
    super();
    this.#allPoints = allPoints;
  }

  get template() {
    return createTipInfoTemplate(this.#allPoints);
  }
}

export default TripInfoView;
