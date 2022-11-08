'use strict';
(function () {
// Работаем с формой
  var adFormElement = document.querySelector('.ad-form');
  var adFormHeader = adFormElement.querySelector('.ad-form-header');
  var adFormElements = adFormElement.querySelectorAll('.ad-form__element');
  var avatarInput = adFormElement.querySelector('#avatar');
  var titleInput = adFormElement.querySelector('#title');
  var addressInput = adFormElement.querySelector('#address');
  var typeInputElement = adFormElement.querySelector('#type');
  var priceInputElement = adFormElement.querySelector('#price');
  var timeInElement = adFormElement.querySelector('#timein');
  var timeOutElement = adFormElement.querySelector('#timeout');
  var roomNumberElement = adFormElement.querySelector('#room_number');
  var capacityElement = adFormElement.querySelector('#capacity');
  var featuresElements = adFormElement.querySelectorAll('.feature__checkbox');
  var descriptionElement = adFormElement.querySelector('#description');
  var imagesElement = adFormElement.querySelector('#images');

  var resetFields = function () {
    avatarInput.value = '';
    titleInput.value = '';
    addressInput.value = '';
    typeInputElement.value = 'flat';
    priceInputElement.value = '';
    timeInElement.value = '12:00';
    timeOutElement.value = '12:00';
    roomNumberElement.value = '1';
    capacityElement.value = '1';
    descriptionElement.value = '';
    imagesElement.value = '';
    for (var i = 0; i < featuresElements.length; i++) {
      featuresElements[i].removeAttribute('checked');
    }
  };

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

  var resetForm = function () {
    disableFormFields();
    resetFields();
  };

  window.form = {
    resetForm: resetForm,
    enableFormFields: enableFormFields,
    setAddressValue: setAddressValue,
  };

  disableFormFields();

  // Валидация формы --------------------------------------------------------------------------------
  // Валидация минимальной цены в зависимости от типа
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
  timeInElement.addEventListener('change', function (evt) {
    timeOutElement.value = evt.target.value;
  });

  timeOutElement.addEventListener('change', function (evt) {
    timeInElement.value = evt.target.value;
  });

  // Валидация соответствия числа комнат и гостей
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

  var successHandler = function () {
    // reset map
    window.map.resetMap();
    // reset form
    window.form.resetForm();
  };

  adFormElement.addEventListener('submit', function (submitEvt) {
    submitEvt.preventDefault();
    window.backend.upload(new FormData(adFormElement), successHandler, window.utils.errorHandler);
  });
})();
