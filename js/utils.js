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

  var errorHandler = function (msg) {
    var divNode = document.createElement('div');
    divNode.classList.add('error-message');
    divNode.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color:' +
      ' red; position: absolute; left: 0; right: 0; font-size: 30px';
    divNode.textContent = msg;
    document.body.insertAdjacentElement('afterbegin', divNode);
  };

  var removeErrorMessage = function () {
    var errorMessageElement = document.querySelector('.error-message');
    if (errorMessageElement) {
      errorMessageElement.remove();
    }
  };

  window.utils = {
    getRandomFromRange: getRandomFromRange,
    getRandomFromArray: getRandomFromArray,
    getRandomSet: getRandomSet,
    errorHandler: errorHandler,
    removeErrorMessage: removeErrorMessage,
    PIN_WIDTH: 65,
    PIN_HEIGHT: 87,
    PHOTO_SIZE: 45,
  };
})();
