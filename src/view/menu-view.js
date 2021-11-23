const createMenuTemplate = () => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
  <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
  <a class="trip-tabs__btn" href="#">Stats</a>
</nav>`
); //шо это за магия? почему тут круглые скобочки в функции а не фигурные? Это типо не совсем функция, вроде видел название - объектная строка.

export {createMenuTemplate};

