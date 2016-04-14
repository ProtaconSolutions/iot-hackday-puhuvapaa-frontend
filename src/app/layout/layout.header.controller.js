(function() {
  'use strict';

  /**
   * Specify controller for badgeFrontend.layout module.
   *
   * @namespace Controllers
   */
  angular
    .module('badgeFrontend.layout')
    .controller('HeaderController', HeaderController);

  //////////

  /**
   * @desc      Controller implementation.
   * @namespace Layout
   * @memberOf  Controllers
   * @ngInject
   *
   * @param {*}                     $state
   * @param {*}                     $mdSidenav
   * @param {Services.AuthService}  AuthService
   * @constructor
   */
  function HeaderController(
    $state, $mdSidenav,
    AuthService
  ) {
    var vm = this;

    // Functions
    vm.profile = profile;
    vm.logout = logout;
    vm.toggleSideMenu = toggleSideMenu;

    //////////

    /**
     * Method to redirect user to his/hers profile page.
     *
     * @param {Event} $event
     */
    function profile($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $state.go('auth.profile');
    }

    /**
     * Method to make logout action.
     *
     * @param {Event} $event
     */
    function logout($event) {
      $event.preventDefault();
      $event.stopPropagation();

      AuthService.logout();
    }

    // Function to toggle side menu
    function toggleSideMenu() {
      $mdSidenav('left')
        .toggle();
    }
  }
})();
