'use strict';
(function () {
  var UPLOAD_URL = 'https://24.javascript.pages.academy/keksobooking';
  var DOWNLOAD_URL = 'https://27.javascript.pages.academy/keksobooking/data';


  var addEventListeners = function (onSuccess, onError, xhr) {
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('неудачно, сервер ответил ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Не удалось выполнить запрос за' + xhr.timeout + 'мс');
    });
  };

  var download = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    addEventListeners(onSuccess, onError, xhr);
    xhr.timeout = 10000;

    xhr.open('GET', DOWNLOAD_URL);
    xhr.send();
  };

  var upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    addEventListeners(onSuccess, onError, xhr);
    xhr.timeout = 10000;

    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);
  };

  window.backend = {
    download: download,
    upload: upload,
  };
})();
