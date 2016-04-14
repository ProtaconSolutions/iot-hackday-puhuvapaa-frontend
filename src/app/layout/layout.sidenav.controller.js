(function() {
  'use strict';

  /**
   * Specify controller for badgeFrontend.layout module.
   *
   * @namespace Controllers
   */
  angular
    .module('badgeFrontend.layout')
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

    vm.contents = [
      {
        title: 'Home',
        icon: 'mdi-home',
        state: 'modules.home'
      },
      {
        title: 'User data',
        icon: 'mdi-account',
        items: [
          {
            title: 'My profile',
            state: 'auth.profile'
          },
          {
            title: 'My badges',
            state: ''
          },
          {
            title: 'My achievements',
            state: ''
          }
        ]
      },
      {
        title: 'Statistics',
        icon: 'mdi-chart-line',
        items: [
          {
            title: 'Badges',
            state: 'modules.badges'
          },
          {
            title: 'Achievements',
            state: ''
          }
        ]
      },
      {
        title: 'Administration',
        icon: 'mdi-settings',
        items: [
          {
            title: 'Badges',
            state: ''
          },
          {
            title: 'Achievements',
            state: ''
          }
        ]
      }
    ];

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
