'use strict';
(function () {
  var mapIsFadded = true;

  var mapPinMain = document.querySelector('.map__pin--main');
  var main = document.querySelector('main');
  var map = document.querySelector('.map');

  // Это вынужденно добавленная функция из-за того, что сервер отдаёт неправильные координаты
  var fixLocations = function (adverts) {
    var result = adverts;
    for (var i = 0; i < adverts.length; i++) {
      result[i].location = {
        lat: window.utils.getRandomFromRange(100, 1000) - window.utils.PIN_WIDTH / 2,
        lng: window.utils.getRandomFromRange(180, 680) - window.utils.PIN_HEIGHT,
      };
    }
    return result;
  };

  var succesHandler = function (data) {
    var rawAdverts = fixLocations(data);
    var adverts = window.utils.getRandomSet(rawAdverts);
    mapPinMain.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      // Активизируем карту
      map.classList.remove('map--faded');

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY,
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY,
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY,
        };

        var topBorder = 170 - window.utils.PIN_HEIGHT;
        var bottomBorder = 700 - window.utils.PIN_HEIGHT;

        if (mapPinMain.offsetTop > bottomBorder || moveEvt.clientY > bottomBorder) {
          shift.y = 0;
          mapPinMain.style.top = bottomBorder + 'px';
        } else if (mapPinMain.offsetTop < topBorder || moveEvt.clientY < topBorder) {
          shift.y = 0;
          mapPinMain.style.top = topBorder + 'px';
        }

        var leftBorder = 0;
        var rightBorder = main.offsetWidth - window.utils.PIN_WIDTH;

        if (mapPinMain.offsetLeft > rightBorder || moveEvt.clientX > rightBorder + main.offsetLeft) {
          shift.x = 0;
          mapPinMain.style.left = rightBorder + 'px';
        } else if (mapPinMain.offsetLeft < leftBorder || moveEvt.clientX < leftBorder + main.offsetLeft) {
          mapPinMain.style.left = leftBorder + 'px';
        }

        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
        window.form.setAddressValue(mapPinMain, true);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        // Активизируем форму
        window.form.enableFormFields();
        // Добавляем данные на страницу
        if (mapIsFadded) {
          window.pins.createPins(adverts);
          window.card.createCard(upEvt, adverts);
          mapIsFadded = !mapIsFadded;
        }
        window.form.setAddressValue(mapPinMain, true);

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  var resetMap = function () {
    // remove pins
    window.pins.removePins();
    // remove card
    window.card.removeCard();
    // disable map
    map.classList.add('map--faded');
    // сброс адреса
    window.form.setAddressValue(mapPinMain, false);
    mapIsFadded = true;
    // обновление данных
    window.backend.download(succesHandler, window.utils.errorHandler);
  };

  window.map = {
    resetMap: resetMap,
  };

  window.backend.download(succesHandler, window.utils.errorHandler);
})();
