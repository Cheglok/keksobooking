'use strict';
(function () {
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

  // Вспомогательные функции генерации DOM элементов
  var createFeaturesListElement = function (advert) {
    var featuresFragment = document.createDocumentFragment();
    var features = advert.offer.features;
    if (features) {
      for (var i = 0; i < features.length; i++) {
        var feature = document.createElement('li');
        feature.classList.add('popup__feature');
        feature.classList.add('popup__feature--' + features[i]);
        featuresFragment.appendChild(feature);
      }
    }
    return featuresFragment;
  };

  var createPhotosListElement = function (advert) {
    var photosFragment = document.createDocumentFragment();
    var photos = advert.offer.photos;
    if (photos) {
      for (var i = 0; i < photos.length; i++) {
        var photo = document.createElement('img');
        photo.classList.add('popup__photo');
        photo.width = window.utils.PHOTO_SIZE;
        photo.height = window.utils.PHOTO_SIZE;
        photo.alt = 'Фотографии жилья';
        photo.src = photos[i];
        photosFragment.appendChild(photo);
      }
    }
    return photosFragment;
  };

  var addCloseListeners = function (card) {
    var closeElement = card.querySelector('.popup__close');
    closeElement.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        card.remove();
      }
    });
    closeElement.addEventListener('click', function () {
      card.remove();
    });
  };


  var mapFilterContainerElement = document.querySelector('.map__filters-container');

  var renderCard = function (advert) {
    var cardOnMap = document.querySelector('.map__card');
    var cardElement;
    if (cardOnMap) {
      cardElement = cardOnMap;
    } else {
      var cardTemplate = document.querySelector('template').content.querySelector('.map__card');
      cardElement = cardTemplate.cloneNode(true);
    }
    var mapElement = document.querySelector('.map');

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

    addCloseListeners(cardElement);
  };

  var createCard = function (advList, cardEvt) {
    if (!cardEvt) {
      console.log('lenght');
      removeCard();
      window.utils.errorHandler('Нет доступных предложений по вашему запросу')
    } else {
      var id = cardEvt.currentTarget.id;
      if (id) {
        renderCard(advList[id]);
      } else if (advList.length) {
        renderCard(advList[0]);
      }
    }
  };

  var removeCard = function () {
    var card = document.querySelector('.map__card');
    if (card) {
      card.remove();
    }
  };

  window.card = {
    createCard: createCard,
    removeCard: removeCard,
  };
})();
