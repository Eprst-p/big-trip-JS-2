import {POINT_TYPES} from './constants';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {formDayjsFromStr, getDateInFormat, getDuration} from './time-and-date.js';


//вычисление данных
const UPPER_CASE_TYPES = POINT_TYPES.map((type) => type.toUpperCase());

const sumPricePerType = (points) => UPPER_CASE_TYPES.map((type) => {
  let price = 0;
  points.forEach((point) => {
    if (point.type === type.toLowerCase()) {
      price += point.basePrice;
    }
  });
  return price;
});

const sumTypesAmount = (points) => UPPER_CASE_TYPES.map((type) => {
  let amount = 0;
  points.forEach((point) => {
    if (point.type === type.toLowerCase()) {
      amount += 1;
    }
  });
  return amount;
});

//не работает
const sumDurationPerType = (points) => UPPER_CASE_TYPES.map((type) => {
  let duration = formDayjsFromStr('00:00', 'HH:mm');
  points.forEach((point) => {
    if (point.type === type.toLowerCase()) {
      const startDayjs = formDayjsFromStr(point.dateFrom, 'DD MM YY HH:mm');
      const endDayjs = formDayjsFromStr(point.dateTo, 'DD MM YY HH:mm');
      duration += getDuration(endDayjs, startDayjs);
    }
  });
  return getDateInFormat(duration, 'DD HH:mm');
});


//рендер чартов
const renderMoneyChart = (moneyElement, points) => {
  const moneyCtx = moneyElement;

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: UPPER_CASE_TYPES,
      datasets: [{
        data: sumPricePerType(points),
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        barThickness: 30,
        minBarLength: 50,
      }],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `€ ${val}`,
        },
      },
      title: {
        display: true,
        text: 'MONEY',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTypeChart = (typeElement, points) => {
  const typeCtx = typeElement;

  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: UPPER_CASE_TYPES,
      datasets: [{
        data: sumTypesAmount(points),
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        barThickness: 30,
        minBarLength: 50,
      }],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${val}x`,
        },
      },
      title: {
        display: true,
        text: 'TYPE',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTimeChart = (timeElement, points) => {
  const timeCtx = timeElement;

  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: UPPER_CASE_TYPES,
      datasets: [{
        data: sumDurationPerType(points),
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        barThickness: 30,
        minBarLength: 50,
      }],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${val}`,
        },
      },
      title: {
        display: true,
        text: 'TIME',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

export {renderMoneyChart, renderTypeChart, renderTimeChart};
