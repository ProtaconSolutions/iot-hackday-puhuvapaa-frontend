(function() {
  'use strict';

  /**
   * Specify run block for badgeFrontend.modules module.
   *
   * @namespace Routes
   */
  angular
    .module('badgeFrontend.modules')
    .run(moduleRun);

  //////////

  /**
   * @desc      Run block for badgeFrontend.modules module.
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
   * @desc      Getter method for badgeFrontend.modules module route definitions.
   * @memberOf  Routes.Auth
   *
   * @returns {*[]}
   */
  function getStates(AccessLevels) {
    return [
      {
        state: 'modules',
        config: {
          abstract: true,
          parent: 'badgeFrontend',
          data: {
            access: AccessLevels.user
          }
        }
      }
    ];
  }
})();
