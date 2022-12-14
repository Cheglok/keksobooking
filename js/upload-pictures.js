'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooserAvatar = document.querySelector('.ad-form-header__input');
  var avatarElement = document.querySelector('.avatar');
  var avatarDropArea = document.querySelector('.ad-form-header__drop-zone');

  var handleAvatar = function (file) {
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
    var avatar = fileChooserAvatar.files[0];
    handleAvatar(avatar);
  });

  avatarDropArea.addEventListener('drop', function (e) {
    stopEvent(e);
    var dt = e.dataTransfer;
    var avatar = dt.files[0];
    handleAvatar(avatar);
  });


  var fileChooserPhotos = document.querySelector('.ad-form__upload input[type=file]');
  var dropAreaPhotos = document.querySelector('.ad-form__drop-zone');
  var photoContainer = document.querySelector('.ad-form__photo-container');
  var allPhotos = [];


  // var renderPhoto = function (photo) {
  //   var reader = new FileReader();
  //   reader.addEventListener('load', function () {
  //     var imgElement = document.createElement('img');
  //     imgElement.src = reader.result;
  //     var imgWrapper = document.createElement('div');
  //     imgWrapper.classList.add('ad-form__photo');
  //     imgWrapper.style = 'overflow: hidden; cursor: move;';
  //     imgElement.style = 'width: 100%; height: 100%; overflow: hidden;';
  //     imgWrapper.appendChild(imgElement);
  //     imgWrapper.draggable = true;
  //     imgElement.draggable = false;
  //     photoContainer.appendChild(imgWrapper);
  //   });
  //   reader.readAsDataURL(photo);
  // };

  var renderPhoto = function (photo) {
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      var imgElement = document.createElement('img');
      imgElement.src = reader.result;
      imgElement.classList.add('ad-form__photo');
      imgElement.style = 'cursor: move;';
      photoContainer.appendChild(imgElement);
    });
    reader.readAsDataURL(photo);
  };

  var renderPhotos = function () {
    var photoElements = document.querySelectorAll('div.ad-form__photo');
    for (var i = 0; i < photoElements.length; i++) {
      photoElements[i].remove();
    }
    allPhotos.forEach(function (photo) {
      renderPhoto(photo);
    });
  };

  var handlePhotos = function (photos) {
    for (var i = 0; i < photos.length; i++) {
      var photo = photos[i];
      var photoName = photo.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return photoName.endsWith(it);
      });
      if (matches) {
        allPhotos.push(photo);
      }
    }
    if (allPhotos.length) {
      renderPhotos();
    }
  };

  fileChooserPhotos.addEventListener('change', function () {
    var photos = fileChooserPhotos.files;
    handlePhotos(photos);
  });

  preventDragenterDragover(dropAreaPhotos);
  dropAreaPhotos.addEventListener('drop', function (e) {
    stopEvent(e);
    var dt = e.dataTransfer;
    var files = dt.files;
    handlePhotos(files);
  });


  photoContainer.addEventListener('dragstart', function (e) {
    e.target.classList.add('selected');
  });

  photoContainer.addEventListener('dragend', function (e) {
    e.target.classList.remove('selected');
  });

  var checkTargetElement = function (cursorPositionX, cursorPositionY, currentElement) {
    var currentElementCoord = currentElement.getBoundingClientRect();
    var currentElementCenterTop = currentElementCoord.y + 15;
    var currentElementCenterBottom = currentElementCoord.y + currentElementCoord.height - 15;
    var currentElementCenterLeft = currentElementCoord.x + 15;
    var currentElementCenterRight = currentElementCoord.x + currentElementCoord.width - 15;

    return cursorPositionX > currentElementCenterLeft && cursorPositionX < currentElementCenterRight &&
      cursorPositionY > currentElementCenterTop && cursorPositionY < currentElementCenterBottom;
  };

  photoContainer.addEventListener('dragover', function (e) {
    e.preventDefault();
    var activeElement = photoContainer.querySelector('.selected');
    var currentElement = e.target;

    var isMoveable = activeElement !== currentElement &&
      currentElement.classList.contains('ad-form__photo') &&
      checkTargetElement(e.clientX, e.clientY, currentElement);
    if (!isMoveable) {
      return;
    }

    var nextElement = (currentElement === activeElement.nextElementSibling) ?
      currentElement.nextElementSibling :
      currentElement;

    photoContainer.insertBefore(activeElement, nextElement);
  });
})();
