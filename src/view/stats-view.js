import SmartView from './smart-view.js';
import {BAR_HEIGHT} from '../utils/constants.js';
import {renderMoneyChart, renderTypeChart, renderTimeChart} from '../utils/statistics.js';

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

class StatsView extends SmartView {
  #moneyCtx = null;
  #typeCtx = null;
  #timeCtx = null;

  #moneyChart = null;
  #typeChart = null;
  #timeChart = null;

  constructor(points) {
    super();
    this.#moneyCtx = this.element.querySelector('#money');
    this.#typeCtx = this.element.querySelector('#type');
    this.#timeCtx = this.element.querySelector('#time');

    this.#moneyCtx.height = BAR_HEIGHT * 5;
    this.#typeCtx.height = BAR_HEIGHT * 5;
    this.#timeCtx.height = BAR_HEIGHT * 5;

    this._data = points;

    this.#setCharts();
  }

  get template() {
    return createStatsTemplate();
  }

  #setCharts = () => {
    this.#moneyChart = renderMoneyChart(this.#moneyCtx, this._data);
    this.#typeChart = renderTypeChart(this.#typeCtx, this._data);
    this.#timeChart = renderTimeChart(this.#timeCtx, this._data);
  }
}

export default StatsView;
