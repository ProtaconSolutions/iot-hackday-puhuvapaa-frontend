(function() {
  'use strict';

  /**
   * Specify run block for talkingHeadFrontend.modules module.
   *
   * @namespace Routes
   */
  angular
    .module('talkingHeadFrontend.modules')
    .run(moduleRun);

  //////////

  /**
   * @desc      Run block for talkingHeadFrontend.modules module.
   * @namespace Modules
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
   * @desc      Getter method for talkingHeadFrontend.modules module route definitions.
   * @memberOf  Routes.Modules
   *
   * @returns {*[]}
   */
  function getStates() {
    return [
      {
        state: 'modules',
        config: {
          abstract: true,
          parent: 'talkingHeadFrontend'
        }
      }
    ];
  }
})();
