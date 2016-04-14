(function() {
  'use strict';

  /**
   * Specify controller for talkingHeadFrontend.modules.home module.
   *
   * @namespace Controllers
   */
  angular
    .module('talkingHeadFrontend.modules.home')
    .controller('homeController', homeController);

  //////////

  /**
   * @desc      Controller implementation for following route:
   *              url:    /
   *              state:  modules.home
   * @namespace home
   * @memberOf  Controllers
   * @ngInject
   *
   * @constructor
   */
  function homeController() {}
}());
