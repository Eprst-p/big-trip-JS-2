const getRandomPositiveNumber = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  return Math.floor(Math.random() * (upper - lower + 1)) + lower; //рандомное число от a до b включительно
};

const getRandomElement = (array) => array[getRandomPositiveNumber(0, array.length-1)];

const updateItem = (array, updatedItem) => {
  const index = array.findIndex((item) => item.id === updatedItem.id);

  if (index === -1) {
    return array;
  }

  return [
    ...array.slice(0, index),
    updatedItem,
    ...array.slice(index + 1),
  ];
};

const sortItemsByDuration = (pointA, pointB) => {
  const valueA = pointA.dateTo - pointA.dateFrom;
  const valueB = pointB.dateTo - pointB.dateFrom;
  return valueB - valueA;
};

const sortItemsByPrice = (pointA, pointB) => {
  const valueA = pointA.basePrice;
  const valueB = pointB.basePrice;
  return valueB - valueA;
};


export {getRandomPositiveNumber, getRandomElement, updateItem, sortItemsByDuration, sortItemsByPrice};
