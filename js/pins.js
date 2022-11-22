'use strict';
(function () {
  var pinsListElement = document.querySelector('.map__pins');
  var mainPinElement = document.querySelector('.map__pin--main');

  var addPinsListeners = function (adverts) {
    var pins = document.querySelectorAll('.map__pin');
    for (var j = 0; j < pins.length; j++) {
      pins[j].addEventListener('click', function (evt) {
        window.card.createCard(adverts, evt);
      });
    }
  };
  // Функции генерация DOM элементов
  var createPins = function (adv) {
    var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
    var fragment = document.createDocumentFragment();

    var pinsOnMap = adv.length > 5 ? 5 : adv.length;

    for (var i = 0; i < pinsOnMap; i++) {
      var pinElement = pinTemplate.cloneNode(true);
      pinElement.id = i;
      pinElement.style = 'left: ' + adv[i].location.lat + 'px; top: ' + adv[i].location.lng + 'px';
      pinElement.querySelector('img').src = adv[i].author.avatar;
      pinElement.querySelector('img').alt = adv[i].offer.title;
      pinElement.classList.add('advert-pin');
      fragment.appendChild(pinElement);
    }
    pinsListElement.insertBefore(fragment, mainPinElement);
    addPinsListeners(adv);
  };

  var removePins = function () {
    var pins = document.querySelectorAll('.advert-pin');
    for (var i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
  };

  var resetMainPin = function () {
    mainPinElement.style.left = '570px';
    mainPinElement.style.top = '375px';
  };

  window.pins = {
    createPins: createPins,
    removePins: removePins,
    resetMainPin: resetMainPin,
  };
})();
