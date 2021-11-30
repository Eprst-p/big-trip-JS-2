
const createTipInfoTemplate = (allPoints) => {

  const startCity = allPoints[0].city;
  const findSecondCity = () => {
    const secondCity = allPoints.length >= 2 ? allPoints[1].city : '';
    return secondCity;
  };
  const lastCity = allPoints[allPoints.length - 1].city;
  const startDate = allPoints[0].dateFrom.format('DD MMM');
  const lastDate = allPoints[allPoints.length - 1].dateTo.format('DD MMM');
  let totalPrice = 0;
  allPoints.forEach((point) => {
    totalPrice += point.basePrice;
  });

  const createCityWritting = () => {
    let cityCount = 0;
    allPoints.forEach((point) => {
      if (point.city !== null) { //пока такая примитивненькая проверка, больше для затравки и теста
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

export {createTipInfoTemplate};
