import AbstractView from './abstract-view.js';
import {formDayjsFromStr, getDateInFormat} from '../utils/time-and-date.js';

const createTipInfoTemplate = (allPoints) => {
  const cities = allPoints.map((point) => point.destination.name);

  const startCity = cities[0];
  const findSecondCity = () => {
    const secondCity = cities.length >= 2 ? cities[1] : '';
    return secondCity;
  };
  const lastCity = cities[cities.length - 1];
  const startDayjs = formDayjsFromStr(allPoints[0].dateFrom, 'DD MM YY HH:mm');
  const startDate = getDateInFormat(startDayjs, 'DD MMM');
  const lastDayjs = formDayjsFromStr(allPoints[cities.length - 1].dateTo, 'DD MM YY HH:mm');
  const lastDate = getDateInFormat(lastDayjs, 'DD MMM');

  let totalPrice = 0;
  allPoints.forEach((point) => {
    totalPrice += +point.basePrice;
  });


  const createCityWritting = () => {
    let cityCount = 0;
    cities.forEach((city) => {
      if (city !== null) { //пока такая примитивненькая проверка, больше для затравки и теста
        cityCount++;
      }
    });
    if (cityCount > 3) {
      return `<h1 class="trip-info__title">${startCity} &mdash; ... &mdash; ${lastCity}</h1>`;
    }
    else  if (cityCount === 3) {
      return `<h1 class="trip-info__title">${startCity} &mdash; ${findSecondCity()} &mdash; ${lastCity}</h1>`;
    }
    else  if (cityCount === 2) {
      return `<h1 class="trip-info__title">${startCity} &mdash; ${lastCity}</h1>`;
    }
    else  if (cityCount === 1) {
      return `<h1 class="trip-info__title">${startCity}</h1>`;
    }
  };

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        ${createCityWritting()}

        <p class="trip-info__dates">${startDate}&nbsp;&mdash;&nbsp;${lastDate}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
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
