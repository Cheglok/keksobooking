'use strict';
(function () {
  // Начальный набор данных

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

  // Функция генерации данных
  window.createAdvertList = function () {
    var advertList = [];
    for (var i = 0; i < 8; i++) {
      advertList[i] = {
        'author': {
          'avatar': 'img/avatars/user0' + (i + 1) + '.png',
        },
        'offer': {
          'title': titlesList[i],
          'address': window.utils.getRandomFromRange(0, 600) + '' + window.utils.getRandomFromRange(0, 300),
          'price': window.utils.getRandomFromRange(1000, 1000000),
          'type': window.utils.getRandomFromArray(typesList),
          'rooms': window.utils.getRandomFromRange(1, 5),
          'guests': window.utils.getRandomFromRange(1, 5),
          'checkin': window.utils.getRandomFromArray(checkinsList),
          'checkout': window.utils.getRandomFromArray(checkinsList),
          'features': window.utils.getRandomSet(availableFeatures),
          'description': 'Описание',
          'photos': window.utils.getRandomSet(photosList, 3),
          'location': {
            'x': window.utils.getRandomFromRange(100, 1000) - window.utils.PIN_WIDTH / 2,
            'y': window.utils.getRandomFromRange(130, 630) - window.utils.PIN_HEIGHT,
          },
        },
      };
    }
    return advertList;
  };
})();
