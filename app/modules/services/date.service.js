(function () {
  'use strict';

  angular.module('dateNow.service', [])
    .factory('dateNow', dateNow);

  function dateNow() {
    return {
      today: todayFn,
      year: yearFn,
      month: monthFn,
      day: dayFn
    }

    function todayFn() {
      return new Date();
    }

    function yearFn() {
      return new Date().getFullYear();
    }

    function monthFn() {
      return new Date().getMonth();
    }

    function dayFn() {
      return new Date().getDate();
    }
  }
})();