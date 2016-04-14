(function() {
  'use strict';

  /**
   * Specify controller for talkingHeadFrontend.layout module.
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
   * @param {*} $state
   * @param {*} $mdSidenav
   * @constructor
   */
  function SidenavController($state, $mdSidenav) {
    var vm = this;

    vm.contents = [];

    // Functions
    vm.hideSideMenu = hideSideMenu;
    vm.goToPage = goToPage;

    //////////

    // Method to close sidenav
    function hideSideMenu() {
      $mdSidenav('left').close();
    }

    function goToPage(state) {
      $state.go(state);
    }
  }
})();
