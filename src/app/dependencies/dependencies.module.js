(function() {
  'use strict';

  /**
   * Initialization of talkingHeadFrontend.dependencies module. This file contains all 3rd party dependencies that
   * application has.
   *
   * @namespace Modules
   */
  angular
    .module('talkingHeadFrontend.dependencies', [
      'ngAnimate', 'ngMaterial', 'ngMessages', 'ngSanitize',
      'ui.router',
      'angular-loading-bar'
    ]);
})();
