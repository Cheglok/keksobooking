'use strict';
var adFormElement = document.querySelector('.ad-form');
var typeInputElement = adFormElement.querySelector('#type');
var priceInputElement = adFormElement.querySelector('#price');

typeInputElement.addEventListener('change', function (evt) {
  typeInputChangeHandler(evt.target.value);
});

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

var timeInElement = adFormElement.querySelector('#timein');
var timeOutElement = adFormElement.querySelector('#timeout');

timeInElement.addEventListener('change', function (evt) {
  timeOutElement.value = evt.target.value;
});

timeOutElement.addEventListener('change', function (evt) {
  timeInElement.value = evt.target.value;
});

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
