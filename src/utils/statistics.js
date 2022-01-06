import {POINT_TYPES} from './constants';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {formDayjsFromStr, getDurationFormat, getDuration, zeroDuration} from './time-and-date.js';


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

const sumDurationPerType = (points) => UPPER_CASE_TYPES.map((type) => {
  let currentDuration = '';
  let totalDuration = zeroDuration;
  points.forEach((point) => {
    if (point.type === type.toLowerCase()) {
      const startDayjs = formDayjsFromStr(point.dateFrom, 'DD MM YY HH:mm');
      const endDayjs = formDayjsFromStr(point.dateTo, 'DD MM YY HH:mm');
      currentDuration = getDuration(endDayjs, startDayjs);
      totalDuration = totalDuration.add(currentDuration);
    }
  });
  return totalDuration;
});

const convertDurationToNumber = (points) => sumDurationPerType(points).map((duration) => duration.asMilliseconds());

const convertDurationToString = (points, dataIndex) => {
  const formatedDurations = sumDurationPerType(points).map((duration) => getDurationFormat(null, null, duration));
  let resultDuration = '';
  formatedDurations.forEach((value, index) => {
    if (index === dataIndex) {
      resultDuration = value;
    }
  });
  return resultDuration;
};


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
        data: convertDurationToNumber(points),
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
          formatter: (value, context) => convertDurationToString(points, context.dataIndex),
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
