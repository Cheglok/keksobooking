'use strict';
(function () {
  var getRandomFromRange = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var getRandomFromArray = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var getRandomSet = function (arr, setLength) {
    if (!setLength) {
      setLength = window.utils.getRandomFromRange(1, arr.length);
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

  window.utils = {
    getRandomFromRange: getRandomFromRange,
    getRandomFromArray: getRandomFromArray,
    getRandomSet: getRandomSet,
    PIN_WIDTH: 65,
    PIN_HEIGHT: 87,
    PHOTO_SIZE: 45,
  };
})();
