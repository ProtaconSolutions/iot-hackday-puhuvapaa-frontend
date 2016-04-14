(function() {
  'use strict';

  /**
   * Specify controller for talkingHeadFrontend.layout module.
   *
   * @namespace Controllers
   */
  angular
    .module('talkingHeadFrontend.layout')
    .controller('HeaderController', HeaderController);

  //////////

  /**
   * @desc      Controller implementation.
   * @namespace Layout
   * @memberOf  Controllers
   * @ngInject
   *
   * @param {*} $mdSidenav
   * @constructor
   */
  function HeaderController($mdSidenav) {
    var vm = this;

    // Functions
    vm.toggleSideMenu = toggleSideMenu;

    //////////

    // Function to toggle side menu
    function toggleSideMenu() {
      $mdSidenav('left')
        .toggle();
    }
  }
})();
