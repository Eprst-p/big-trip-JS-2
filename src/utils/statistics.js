import {POINT_TYPES} from './constants';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {formDayjsFromStr, getDurationFormat, getDuration, zeroDuration} from './time-and-date.js';

//вычисление данных
const UPPER_CASE_TYPES = POINT_TYPES.map((type) => type.toUpperCase());

let sortedTypesByPrice = [];
let sortedTypesByTypes = [];
let sortedTypesByDuration = [];

let formatedDurations = [];

const sortByAnyValue = (labelA, labelB) => {
  const valueA = labelA.VALUE;
  const valueB = labelB.VALUE;
  return valueB - valueA;
};

const sumPricePerType = (points) => {
  const prices = UPPER_CASE_TYPES.map((type) => {
    let price = 0;
    points.forEach((point) => {
      if (point.type === type.toLowerCase()) {
        price += point.basePrice;
      }
    });
    return price;
  });

  const labels = UPPER_CASE_TYPES.map((type, index) => ({
    TYPE: type,
    VALUE: prices[index],
  }));

  const sortedLabels = labels.sort(sortByAnyValue);
  const sortedValues = sortedLabels.map((element) => element.VALUE);
  sortedTypesByPrice = sortedLabels.map((element) => element.TYPE);

  return sortedValues;
};

const sumTypesAmount = (points) => {
  const typesAmount = UPPER_CASE_TYPES.map((type) => {
    let amount = 0;
    points.forEach((point) => {
      if (point.type === type.toLowerCase()) {
        amount += 1;
      }
    });
    return amount;
  });

  const labels = UPPER_CASE_TYPES.map((type, index) => ({
    TYPE: type,
    VALUE: typesAmount[index],
  }));

  const sortedLabels = labels.sort(sortByAnyValue);
  const sortedValues = sortedLabels.map((element) => element.VALUE);
  sortedTypesByTypes = sortedLabels.map((element) => element.TYPE);

  return sortedValues;
};

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

const convertDurationToNumber = (points) => {
  const durations = sumDurationPerType(points).map((duration) => ({
    MILISECONDS: duration.asMilliseconds(),
    FORMATED_TIME: getDurationFormat(null, null, duration),
  }));

  const labels = UPPER_CASE_TYPES.map((type, index) => ({
    TYPE: type,
    VALUE: durations[index].MILISECONDS,
    FORMATED: durations[index].FORMATED_TIME,
  }));

  const sortedLabels = labels.sort(sortByAnyValue);
  const sortedValues = sortedLabels.map((element) => element.VALUE);
  sortedTypesByDuration = sortedLabels.map((element) => element.TYPE);
  formatedDurations = sortedLabels.map((element) => element.FORMATED);

  return sortedValues;
};

const convertDurationToString = (dataIndex) => {
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
      datasets: [{
        data: sumPricePerType(points),
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        barThickness: 30,
        minBarLength: 50,
      }],
      labels: sortedTypesByPrice,
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
      datasets: [{
        data: sumTypesAmount(points),
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        barThickness: 30,
        minBarLength: 50,
      }],
      labels: sortedTypesByTypes,
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
      datasets: [{
        data: convertDurationToNumber(points),
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        barThickness: 30,
        minBarLength: 100,
      }],
      labels: sortedTypesByDuration,
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
          formatter: (value, context) => convertDurationToString(context.dataIndex),
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
