'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooserAvatar = document.querySelector('.ad-form-header__input');
  var avatarElement = document.querySelector('.avatar');
  var avatarDropArea = document.querySelector('.ad-form-header__drop-zone');

  var handleFile = function (file) {
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        renderAvatar(reader.result);
      });
      reader.readAsDataURL(file);
    }
  };

  var renderAvatar = function (data) {
    avatarElement.src = data;
  };

  var stopEvent = function (e) {
    e.preventDefault();
    e.stopPropagation();
  };

  var preventDragenterDragover = function (element) {
    element.addEventListener('dragenter', function (e) {
      stopEvent(e);
    });
    element.addEventListener('dragover', function (e) {
      stopEvent(e);
    });
  };

  preventDragenterDragover(avatarDropArea);

  fileChooserAvatar.addEventListener('change', function () {
    var file = fileChooserAvatar.files[0];
    handleFile(file);
  });

  avatarDropArea.addEventListener('drop', function (e) {
    stopEvent(e);
    var dt = e.dataTransfer;
    var file = dt.files[0];
    handleFile(file);
  });

  var fileChooserPhotos = document.querySelector('.ad-form__upload input[type=file]');
  var dropAreaPhotos = document.querySelector('.ad-form__drop-zone');
  var photoContainer = document.querySelector('.ad-form__photo-container');
  var photoElement = document.querySelector('div.ad-form__photo');

  var renderPhoto = function (photo) {
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      var imgElement = document.createElement('img');
      imgElement.src = reader.result;
      var imgWrapper = document.createElement('div');
      imgWrapper.classList.add('ad-form__photo');
      imgWrapper.style = 'overflow: hidden;';
      imgElement.style = 'width: 100%; height: 100%; overflow: hidden;';
      imgWrapper.appendChild(imgElement);
      photoContainer.appendChild(imgWrapper);
    });
    reader.readAsDataURL(photo);
  };

  var handlePhotos = function (photos) {
    for (var i = 0; i < photos.length; i++) {
      var photo = photos[i];
      var photoName = photo.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return photoName.endsWith(it);
      });

      if (matches) {
        renderPhoto(photo);
        photoElement.remove();
      }
    }
  };

  fileChooserPhotos.addEventListener('change', function () {
    var photos = fileChooserPhotos.files;
    handlePhotos(photos);
  });
})();
