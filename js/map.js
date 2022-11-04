'use strict';
(function () {
  // получаем данные
  var adverts = window.createAdvertList();

  var mapIsFadded = true;
  var mapPinMain = document.querySelector('.map__pin--main');
  var main = document.querySelector('main');

  // Действия перед стартом
  var resetPage = function () {
    window.form.setAddressValue(mapPinMain, false);
    window.form.disableFormFields();
  };

  resetPage();

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    // Активизируем карту
    document.querySelector('.map').classList.remove('map--faded');

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

      if (mapPinMain.offsetTop > 630 || moveEvt.clientY > 630) {
        shift.y = 0;
        mapPinMain.style.top = '630px';
      } else if (mapPinMain.offsetTop < 130 || moveEvt.clientY < 130) {
        shift.y = 0;
        mapPinMain.style.top = '130px';
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
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      // Активизируем форму
      window.form.enableFormFields();
      // Добавляем данные на страницу
      if (mapIsFadded) {
        window.createPins(adverts);
        window.createCard(upEvt, adverts);
        mapIsFadded = !mapIsFadded;
      }
      window.form.setAddressValue(mapPinMain, true);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
