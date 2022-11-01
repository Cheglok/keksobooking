//Константы для формирования данных
const titlesList = [
  "Большая уютная квартира",
  "Маленькая неуютная квартира",
  "Огромный прекрасный дворец",
  "Маленький ужасный дворец",
  "Красивый гостевой домик",
  "Некрасивый негостеприимный домик",
  "Уютное бунгало далеко от моря",
  "Неуютное бунгало по колено в воде"
];

const typesList = [
  "palace", "flat", "house", "bungalo"
];

const photosList = [
  "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
];

const availibleFeatures = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",];

const checkinsList = ["12:00", "13:00", "14:00"];

//Вспомогательные функции
const getRandomFromRange = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

const getRandomFromArray = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getRandomSet = function (arr, setLength = getRandomFromRange(1, arr.length)) {
  let cloneArr = arr.slice(0);
  cloneArr.sort(() => Math.random() - 0.5);
  let set = [];
  for (let i = 0; i < setLength; i++) {
    set[i] = cloneArr.pop();
  }
  return set;
};

const getType = function (type) {
  switch (type) {
    case 'flat': return 'Квартира';
    case 'bungalo': return 'Бунгало';
    case 'house': return 'Дом';
    case 'palace': return 'Дворец';
  }
};


//Функция генерации данных
const createAdvertList = function () {
  let advertList = [];
  for (let i = 0; i < 8; i++) {
    advertList[i] = {
      "author": {
        "avatar": `img/avatars/user0${i+1}.png`
      },
      "offer": {
        "title": titlesList[i],
        "address": `${getRandomFromRange(0, 600)}, ${getRandomFromRange(0, 300)}`,
        "price": getRandomFromRange(1000, 1000000),
        "type": getRandomFromArray(typesList),
        "rooms": getRandomFromRange(1, 5),
        "guests": getRandomFromRange(1, 5),
        "checkin": getRandomFromArray(checkinsList),
        "checkout": getRandomFromArray(checkinsList),
        "features": getRandomSet(availibleFeatures),
        "description": "Описание",
        "photos": getRandomSet(photosList, 3),
        "location": {
          "x": getRandomFromRange(100, 1000) - 32,
          "y": getRandomFromRange(130, 630) - 83,
        }
      }
    }
  }
  return advertList;
};


//Вспомогательные функции генерации DOM элементов
let createFeaturesListElement = function (advert) {
  let featuresFragment = document.createDocumentFragment();
  let features = advert.offer.features;
  for (let i = 0; i < features.length; i++) {
    let feature = document.createElement('li');
    feature.classList.add(`popup__feature`);
    feature.classList.add(`popup__feature--${features[i]}`);
    featuresFragment.appendChild(feature)
  }
  return featuresFragment;
}

let createPhotosListElement = function (advert) {
  let photosFragment = document.createDocumentFragment();
  let photos = advert.offer.photos;
  for (let i = 0; i < photos.length; i++) {
    let photo = document.createElement('img');
    photo.classList.add(`popup__photo`);
    photo.width = 45;
    photo.height = 45;
    photo.alt = "Фотографии жилья";
    photo.src = photos[i];
    photosFragment.appendChild(photo)
  }
  return photosFragment;
}


//Функции генерация DOM элементов
const createPins = function (adverts) {
  let pinTemplate = document.querySelector('.map__pin');
  let pinsListElement = document.querySelector('.map__pins');
  let fragment = document.createDocumentFragment();

  for (let i = 0; i < adverts.length; i++) {
    let pinElement = pinTemplate.cloneNode(true);
    pinElement.style = `left: ${adverts[i].offer.location.x}px; top: ${adverts[i].offer.location.y}px`
    pinElement.querySelector('img').src = adverts[i].author.avatar;
    pinElement.querySelector('img').alt = adverts[i].offer.title;
    fragment.appendChild(pinElement);
  }

  pinsListElement.appendChild(fragment);
}

const createCard = function (adverts) {
  let cardTemplate = document.querySelector('template').content.querySelector('.map__card');
  let mapElement = document.querySelector('.map');
  let mapFilterContainerElement = document.querySelector('.map__filters-container');

  let cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__avatar').src = adverts[0].author.avatar;
  cardElement.querySelector('.popup__title').textContent = adverts[0].offer.title;
  cardElement.querySelector('.popup__text--address').textContent = adverts[0].offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${adverts[0].offer.price}₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = getType(adverts[0].offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = `${adverts[0].offer.rooms} комнат для ${adverts[0].offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${adverts[0].offer.checkin} выезд до ${adverts[0].offer.checkout}`;
  cardElement.querySelector('.popup__features').innerHTML = '';
  cardElement.querySelector('.popup__features').appendChild(createFeaturesListElement(adverts[0]));
  cardElement.querySelector('.popup__photos').innerHTML = '';
  cardElement.querySelector('.popup__photos').appendChild(createPhotosListElement(adverts[0]));
  cardElement.querySelector('.popup__description').textContent = adverts[0].offer.description;

  mapElement.insertBefore(cardElement, mapFilterContainerElement);
}


//Изменение вида страницы
document.querySelector('.map').classList.remove('map--faded');

//Добавляем данные на страницу
let adverts = createAdvertList();
createPins(adverts);
createCard(adverts);













