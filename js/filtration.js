'use strict';
(function () {
  // dom elements
  var filterForm = document.querySelector('.map__filters');
  var housingTypeSelect = filterForm.querySelector('#housing-type');
  var housingPriceSelect = filterForm.querySelector('#housing-price');
  var housingRoomsSelect = filterForm.querySelector('#housing-rooms');
  var housingGuestsSelect = filterForm.querySelector('#housing-guests');

  var filterFormCheckboxes = filterForm.querySelectorAll('.map__checkbox');
  var filterFormSelects = filterForm.querySelectorAll('.map__filter');
  var filterFormInputs = filterForm.querySelectorAll('.map__checkbox, .map__filter');

  var resetFilterForm = function () {
    filterFormSelects.forEach(function (select) {
      select.value = 'any';
    });
    filterFormCheckboxes.forEach(function (checkbox) {
      checkbox.checked = false;
    });
  };

  // add filtration event listeners to all fields
  filterFormInputs.forEach(function (item) {
    item.addEventListener('change', function () {
      refreshAdverts();
    });
  });

  // refresh adverts after filtration, show new pins and card
  var refreshAdverts = function (upEvt) {
    // clean up the map
    window.utils.removeErrorMessage();
    window.pins.removePins();
    window.card.removeCard();
    // make filtration
    var filteredAdverts = getFilteredAdverts();
    // show new pins and card or error message
    if (filteredAdverts.length) {
      window.pins.createPins(filteredAdverts);
      window.card.createCard(filteredAdverts, upEvt);
    } else {
      window.utils.errorHandler('Нет доступных предложений по вашему запросу');
    }
  };

  var getFilteredAdverts = function () {
    var filteredAdverts = window.adverts.slice();
    filteredAdverts = filteredAdverts.filter(function (adv) {
      return checkType(adv) && checkPrice(adv) && checkRooms(adv) && checkGuests(adv) && checkFeatures(adv);
    });
    return filteredAdverts;
  };

  var checkType = function (adv) {
    return housingTypeSelect.value === 'any' || adv.offer.type === housingTypeSelect.value;
  };

  var checkPrice = function (adv) {
    switch (housingPriceSelect.value) {
      case 'any':
        return true;
      case 'middle':
        if (adv.offer.price < 10000 || adv.offer.price > 50000) {
          return false;
        }
        break;
      case 'low':
        if (adv.offer.price > 10000) {
          return false;
        }
        break;
      case 'high':
        if (adv.offer.price < 50000) {
          return false;
        }
    }
    return true;
  };

  var checkRooms = function (adv) {
    return housingRoomsSelect.value === 'any' || +housingRoomsSelect.value === adv.offer.rooms;
  };

  var checkGuests = function (adv) {
    return housingGuestsSelect.value === 'any' || +housingGuestsSelect.value === adv.offer.guests;
  };

  var checkFeatures = function (adv) {
    for (var i = 0; i < filterFormCheckboxes.length; i++) {
      if (filterFormCheckboxes[i].checked) {
        if (!adv.offer.features) {
          return false;
        } else if (!adv.offer.features.includes(filterFormCheckboxes[i].value)) {
          return false;
        }
      }
    }
    return true;
  };

  window.filtration = {
    refreshAdverts: refreshAdverts,
    resetFilterForm: resetFilterForm,
  };
})();
