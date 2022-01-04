import AbstractView from './abstract-view.js';

const createStatsTemplate = () => (
  `<section class="statistics">
    <h2>Trip statistics</h2>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="money" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="type" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="time" width="900"></canvas>
    </div>
  </section>`
);


class StatsView extends AbstractView {

  get template() {
    return createStatsTemplate();
  }

}

export default StatsView;
