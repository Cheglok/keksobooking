'use strict';
(function () {
  var addPinsListeners = function (adverts) {
    var pins = document.querySelectorAll('.map__pin');
    for (var j = 0; j < pins.length; j++) {
      pins[j].addEventListener('click', function (evt) {
        window.createCard(evt, adverts);
      });
    }
  };
  // Функции генерация DOM элементов
  window.createPins = function (adv) {
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
    addPinsListeners(adv);
  };
})();
