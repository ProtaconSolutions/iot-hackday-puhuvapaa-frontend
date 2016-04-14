(function() {
  'use strict';

  /**
   * Specify run block for badgeFrontend.layout module.
   *
   * @namespace Routes
   */
  angular
    .module('badgeFrontend.layout')
    .run(moduleRun);

  //////////

  /**
   * @desc      Run block for badgeFrontend.layout module.
   * @namespace Layout
   * @memberOf  Routes
   * @ngInject
   *
   * @param {Providers.RouterHelper}  routerHelper
   */
  function moduleRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  /**
   * @name      getStates
   * @desc      Getter method for module route definitions.
   * @memberOf  Routes.Layout
   *
   * @returns {*[]}
   */
  function getStates() {
    return [
      {
        state: 'badgeFrontend',
        config: {
          abstract: true,
          views: {
            sidenav: {
              templateUrl: '/badge-frontend/layout/sidenav.html',
              controller: 'SidenavController',
              controllerAs: 'vm'
            },
            header: {
              templateUrl: '/badge-frontend/layout/header.html',
              controller: 'HeaderController',
              controllerAs: 'vm'
            },
            footer: {
              templateUrl: '/badge-frontend/layout/footer.html',
              controller: 'FooterController',
              controllerAs: 'vm'
            }
          }
        }
      }
    ];
  }
})();
