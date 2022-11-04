'use strict';
(function () {
  // получаем данные
  var adverts = window.createAdvertList();

  var mapIsFadded = true;
  var mapPinMain = document.querySelector('.map__pin--main');

  // Действия перед стартом
  var resetPage = function () {
    window.form.setAddressValue(mapPinMain, false);
    window.form.disableFormFields();
  };

  resetPage();

  mapPinMain.addEventListener('mouseup', function (pinEvt) {
    // Активизируем карту
    document.querySelector('.map').classList.remove('map--faded');
    // Активизируем форму
    window.form.enableFormFields();
    // Добавляем данные на страницу
    if (mapIsFadded) {
      window.createPins(adverts);
      window.createCard(pinEvt, adverts);
      mapIsFadded = !mapIsFadded;
    }
    window.form.setAddressValue(mapPinMain, true);
  });
})();
