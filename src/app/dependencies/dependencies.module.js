(function() {
  'use strict';

  /**
   * Initialization of badgeFrontend.dependencies module. This file contains all 3rd party dependencies that
   * application has.
   *
   * @namespace Modules
   */
  angular
    .module('badgeFrontend.dependencies', [
      'ngAnimate', 'ngMaterial', 'ngMessages', 'ngSanitize', 'ngStorage',
      'ui.router',
      'angular-jwt', 'angular-loading-bar', 'angular.img', 'angularMoment'
    ]);
})();
