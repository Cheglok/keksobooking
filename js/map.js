'use strict';
// Константы для формирования данных
var PIN_WIDTH = 65;
var PIN_HEIGHT = 87;
var mapIsFadded = true;

var titlesList = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде',
];

var typesList = [
  'palace', 'flat', 'house', 'bungalow',
];

var photosList = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

var availableFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var checkinsList = ['12:00', '13:00', '14:00'];


// Вспомогательные функции
var getRandomFromRange = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomFromArray = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomSet = function (arr, setLength) {
  if (!setLength) {
    setLength = getRandomFromRange(1, arr.length);
  }
  var cloneArr = arr.slice(0);
  cloneArr.sort(function () {
    return Math.random() - 0.5;
  });
  var set = [];
  for (var i = 0; i < setLength; i++) {
    set[i] = cloneArr.pop();
  }
  return set;
};

var getType = function (type) {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
  }
  return '';
};


// Функция генерации данных
var createAdvertList = function () {
  var advertList = [];
  for (var i = 0; i < 8; i++) {
    advertList[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png',
      },
      'offer': {
        'title': titlesList[i],
        'address': getRandomFromRange(0, 600) + '' + getRandomFromRange(0, 300),
        'price': getRandomFromRange(1000, 1000000),
        'type': getRandomFromArray(typesList),
        'rooms': getRandomFromRange(1, 5),
        'guests': getRandomFromRange(1, 5),
        'checkin': getRandomFromArray(checkinsList),
        'checkout': getRandomFromArray(checkinsList),
        'features': getRandomSet(availableFeatures),
        'description': 'Описание',
        'photos': getRandomSet(photosList, 3),
        'location': {
          'x': getRandomFromRange(100, 1000) - PIN_WIDTH / 2,
          'y': getRandomFromRange(130, 630) - PIN_HEIGHT,
        },
      },
    };
  }
  return advertList;
};

var adverts = createAdvertList();

// Вспомогательные функции генерации DOM элементов
var createFeaturesListElement = function (advert) {
  var featuresFragment = document.createDocumentFragment();
  var features = advert.offer.features;
  for (var i = 0; i < features.length; i++) {
    var feature = document.createElement('li');
    feature.classList.add('popup__feature');
    feature.classList.add('popup__feature--' + features[i]);
    featuresFragment.appendChild(feature);
  }
  return featuresFragment;
};

var createPhotosListElement = function (advert) {
  var photosFragment = document.createDocumentFragment();
  var photos = advert.offer.photos;
  for (var i = 0; i < photos.length; i++) {
    var photo = document.createElement('img');
    photo.classList.add('popup__photo');
    photo.width = 45;
    photo.height = 45;
    photo.alt = 'Фотографии жилья';
    photo.src = photos[i];
    photosFragment.appendChild(photo);
  }
  return photosFragment;
};

var renderNewCard = function (evt) {
  var id = evt.currentTarget.id;
  if (id) {
    createCard(adverts[id]);
  }
};

// Функции генерация DOM элементов
var createPins = function (adv) {
  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var pinsListElement = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < adv.length; i++) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.id = i;
    pinElement.style = 'left: ' + adv[i].offer.location.x + 'px; top: ' + adv[i].offer.location.y + 'px';
    pinElement.querySelector('img').src = adv[i].author.avatar;
    pinElement.querySelector('img').alt = adv[i].offer.title;
    fragment.appendChild(pinElement);
  }

  pinsListElement.appendChild(fragment);
};

var createCard = function (advert) {
  var cardOnMap = document.querySelector('.map__card');
  var cardElement;
  if (cardOnMap) {
    cardElement = cardOnMap;
  } else {
    var cardTemplate = document.querySelector('template').content.querySelector('.map__card');
    cardElement = cardTemplate.cloneNode(true);
  }
  var mapElement = document.querySelector('.map');
  var mapFilterContainerElement = document.querySelector('.map__filters-container');

  cardElement.querySelector('.popup__avatar').src = advert.author.avatar;
  cardElement.querySelector('.popup__title').textContent = advert.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = advert.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = advert.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = getType(advert.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = advert.offer.rooms + ' комнат для ' + advert.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ' выезд до ' + advert.offer.checkout;
  cardElement.querySelector('.popup__features').innerHTML = '';
  cardElement.querySelector('.popup__features').appendChild(createFeaturesListElement(advert));
  cardElement.querySelector('.popup__photos').innerHTML = '';
  cardElement.querySelector('.popup__photos').appendChild(createPhotosListElement(advert));
  cardElement.querySelector('.popup__description').textContent = advert.offer.description;

  mapElement.insertBefore(cardElement, mapFilterContainerElement);
};

// Работаем с формой
var adFormHeader = document.querySelector('.ad-form-header');
var adFormElements = document.querySelectorAll('.ad-form__element');
var mapPin = document.querySelector('.map__pin--main');
var addressInput = document.querySelector('#address');

var disableFormFields = function () {
  adFormHeader.setAttribute('disabled', 'disabled');
  for (var i = 0; i < adFormElements.length; i++) {
    adFormElements[i].setAttribute('disabled', 'disabled');
  }
};

var setAddressValue = function (active) {
  var leftPosition = mapPin.offsetLeft + PIN_WIDTH / 2;
  var topPosition = mapPin.offsetTop;
  if (!active) {
    addressInput.value = leftPosition + ' ' + (+topPosition + +PIN_WIDTH / 2);
  } else {
    addressInput.value = leftPosition + ' ' + (+topPosition + PIN_HEIGHT);
  }
};

var enableFormFields = function () {
  adFormHeader.removeAttribute('disabled');
  for (var i = 0; i < adFormElements.length; i++) {
    adFormElements[i].removeAttribute('disabled');
  }
};

var addPinsListeners = function () {
  var pins = document.querySelectorAll('.map__pin');
  for (var j = 0; j < pins.length; j++) {
    pins[j].addEventListener('click', function (evt) {
      renderNewCard(evt);
    });
  }
};

// Действия перед стартом
var resetPage = function () {
  disableFormFields();
  setAddressValue(false);
};

resetPage();


mapPin.addEventListener('mouseup', function () {
  // Активизируем карту
  document.querySelector('.map').classList.remove('map--faded');
  // Активизируем форму
  enableFormFields();
  // Добавляем данные на страницу
  if (mapIsFadded) {
    createPins(adverts);
    addPinsListeners();
    createCard(adverts[0]);
    mapIsFadded = !mapIsFadded;
  }
  setAddressValue(true);
});
