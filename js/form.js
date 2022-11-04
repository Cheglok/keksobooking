'use strict';
(function () {
// Работаем с формой
  var addressInput = document.querySelector('#address');
  var adFormHeader = document.querySelector('.ad-form-header');
  var adFormElements = document.querySelectorAll('.ad-form__element');

  var setAddressValue = function (mapPin, active) {
    var leftPosition = mapPin.offsetLeft + window.utils.PIN_WIDTH / 2;
    var topPosition = mapPin.offsetTop;
    if (!active) {
      addressInput.value = leftPosition + ' ' + (+topPosition + +window.utils.PIN_WIDTH / 2);
    } else {
      addressInput.value = leftPosition + ' ' + (+topPosition + window.utils.PIN_HEIGHT);
    }
  };

  var disableFormFields = function () {
    adFormHeader.setAttribute('disabled', 'disabled');
    for (var i = 0; i < adFormElements.length; i++) {
      adFormElements[i].setAttribute('disabled', 'disabled');
    }
  };

  var enableFormFields = function () {
    adFormHeader.removeAttribute('disabled');
    for (var i = 0; i < adFormElements.length; i++) {
      adFormElements[i].removeAttribute('disabled');
    }
  };

  window.form = {
    disableFormFields: disableFormFields,
    enableFormFields: enableFormFields,
    setAddressValue: setAddressValue,
  };

  // Валидация формы
  // Валидация минимальной цены в зависимости от типа
  var adFormElement = document.querySelector('.ad-form');
  var typeInputElement = adFormElement.querySelector('#type');
  var priceInputElement = adFormElement.querySelector('#price');

  var typeInputChangeHandler = function (type) {
    var price;
    switch (type) {
      case 'bungalow':
        price = 0;
        break;
      case 'flat':
        price = 1000;
        break;
      case 'house':
        price = 5000;
        break;
      case 'palace':
        price = 10000;
        break;
    }
    setMinPrice(price);
    setPlaceholderPrice(price);
  };

  var setMinPrice = function (price) {
    priceInputElement.setAttribute('min', price);
  };
  var setPlaceholderPrice = function (price) {
    priceInputElement.setAttribute('placeholder', price);
  };

  typeInputElement.addEventListener('change', function (evt) {
    typeInputChangeHandler(evt.target.value);
  });

  // валидация времени заселения и выезда
  var timeInElement = adFormElement.querySelector('#timein');
  var timeOutElement = adFormElement.querySelector('#timeout');

  timeInElement.addEventListener('change', function (evt) {
    timeOutElement.value = evt.target.value;
  });

  timeOutElement.addEventListener('change', function (evt) {
    timeInElement.value = evt.target.value;
  });

  // Валидация соответствия числа комнат и гостей
  var roomNumberElement = adFormElement.querySelector('#room_number');
  var capacityElement = adFormElement.querySelector('#capacity');


  var setGuestsValidity = function () {
    var rooms = +roomNumberElement.value;
    var guests = +capacityElement.value;
    if (+rooms === 100 && guests > 0) {
      capacityElement.setCustomValidity('Это не для гостей');
    } else if (+rooms === 1 && (guests > 1 || guests === 0)) {
      capacityElement.setCustomValidity('Одна комната - один гость!');
    } else if (+rooms === 2 && (guests === 3 || guests === 0)) {
      capacityElement.setCustomValidity('Две комнаты - один гость или два');
    } else if (+rooms === 3 && guests === 0) {
      capacityElement.setCustomValidity('Три комнаты - извольте заселить гостей!');
    } else {
      capacityElement.setCustomValidity('');
    }
  };

  roomNumberElement.addEventListener('change', setGuestsValidity);
  capacityElement.addEventListener('change', setGuestsValidity);

  setGuestsValidity();
})();
