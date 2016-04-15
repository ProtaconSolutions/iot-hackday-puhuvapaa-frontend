(function() {
  'use strict';

  /**
   * Specify controller for badgeFrontend.layout module.
   *
   * @namespace Controllers
   */
  angular
    .module('talkingHeadFrontend.layout')
    .controller('SidenavController', SidenavController);

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
  function SidenavController(
    $mdSidenav,
    HistoryService
  ) {
    var vm = this;

    vm.histories = HistoryService;

    // Functions
    vm.hideSideMenu = hideSideMenu;

    //////////

    // Method to close sidenav
    function hideSideMenu() {
      $mdSidenav('left').close();
    }
  }
})();