(function() {
  'use strict';

  /**
   * Specify run block for badgeFrontend.modules.home module.
   *
   * @namespace Routes
   */
  angular
    .module('badgeFrontend.modules.home')
    .run(moduleRun);

  //////////

  /**
   * @desc      Run block for badgeFrontend.modules.home module.
   * @namespace Auth
   * @memberOf  Routes
   * @ngInject
   *
   * @param {Providers.RouterHelper}  routerHelper
   * @param {AccessLevels}            AccessLevels
   */
  function moduleRun(routerHelper, AccessLevels) {
    routerHelper.configureStates(getStates(AccessLevels));
  }

  /**
   * @name      getStates
   * @desc      Getter method for badgeFrontend.core.auth.login module route definitions.
   * @memberOf  Routes.Auth
   *
   * @returns {*[]}
   */
  function getStates(AccessLevels) {
    return [
      {
        state: 'modules.home',
        config: {
          url: '/',
          title: 'Home',
          data: {
            access: AccessLevels.anon
          },
          views: {
            'content@': {
              templateUrl: '/badge-frontend/modules/home/home.html',
              controller: 'homeController',
              controllerAs: 'vm'
            }
          }
        }
      }
    ];
  }
}());
