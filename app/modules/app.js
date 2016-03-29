(function () {
  'use strict';
  angular
    .module('app', [
      'ngRoute',
      'fileupload.service',
      'timeParse.service',
      'fileUpload.component',
      'charjs.component'
    ])
    .config(appConfig)
    .controller('appCtrl', appCtrl);

  function appConfig($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'modules/app.html',
        controller: 'appCtrl',
        controllerAs: 'ac'
      })
      .otherwise({
        redirectTo: '/'
      });
    // configure html5 to get links working on jsfiddle
    $locationProvider.html5Mode(true);
  }

  function appCtrl() {
    var vm = this;
    vm.title = 'Hello Betson';
  }
})();