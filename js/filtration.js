'use strict';
(function () {

  var filterForm = document.querySelector('.map__filters');
  var housingTypeSelect = filterForm.querySelector('#housing-type');
  var housingPriceSelect = filterForm.querySelector('#housing-price');
  var housingRoomsSelect = filterForm.querySelector('#housing-rooms');
  var housingGuestsSelect = filterForm.querySelector('#housing-guests');
  // var filterWifiCheckbox = filterForm.querySelector('#filter-wifi');
  // var filterDishwasherCheckbox = filterForm.querySelector('#filter-dishwasher');
  // var filterParkingCheckbox = filterForm.querySelector('#filter-parking');
  // var filterWasherCheckbox = filterForm.querySelector('#filter-washer');
  // var filterElevatorCheckbox = filterForm.querySelector('#filter-elevator');
  // var filterConditionerCheckbox = filterForm.querySelector('#filter-conditioner');

  var filterFormCheckboxes = filterForm.querySelectorAll('.map__checkbox');
  var filterFormInputs = filterForm.querySelectorAll('.map__checkbox, .map__filter');

  filterFormInputs.forEach(function (item) {
    item.addEventListener('change', function () {
      refreshAdverts();
    });
  });

  var refreshAdverts = function () {
    window.utils.removeErrorMessage();
    window.pins.removePins();
    window.pins.createPins(getFilteredAdverts());
    window.card.createCard(getFilteredAdverts(), null);
  };

  var getFilteredAdverts = function () {
    var filteredAdverts = window.adverts.slice();
    filteredAdverts = filteredAdverts.filter(filterAll);
    console.log('filtration', filteredAdverts);
    return filteredAdverts;
  };

  var filterAll = function (adv) {
    return !(!checkType(adv) || !checkPrice(adv) || !checkRooms(adv) || !checkGuests(adv) || !checkFeatures(adv));
  };

  var checkType = function (adv) {
    return !(housingTypeSelect.value !== 'any' && adv.offer.type !== housingTypeSelect.value);
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
    return !(housingRoomsSelect.value !== 'any' && +housingRoomsSelect.value !== adv.offer.rooms);
  };

  var checkGuests = function (adv) {
    return !(housingGuestsSelect.value !== 'any' && +housingGuestsSelect.value !== adv.offer.guests);
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

  window.getFilteredAdverts = getFilteredAdverts;
})();
