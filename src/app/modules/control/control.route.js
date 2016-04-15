(function() {
  'use strict';

  /**
   * Specify run block for talkingHeadFrontend.modules.control module.
   *
   * @namespace Routes
   */
  angular
    .module('talkingHeadFrontend.modules.control')
    .run(moduleRun);

  //////////

  /**
   * @desc      Run block for talkingHeadFrontend.modules.control module.
   * @namespace Home
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
   * @desc      Getter method for talkingHeadFrontend.modules.control module route definitions.
   * @memberOf  Routes.Home
   *
   * @returns {*[]}
   */
  function getStates() {
    return [
      {
        state: 'modules.control',
        config: {
          url: '/',
          title: 'Control',
          views: {
            'content@': {
              templateUrl: '/talking-head-frontend/modules/control/control.html',
              controller: 'controlController',
              controllerAs: 'vm',
              resolve: {
                _reset: _reset
              }
            }
          }
        }
      }
    ];
  }

  //////////

  /**
   * @ngInject
   *
   * @param {*} ControlService
   * @returns {*}
   * @private
   */
  function _reset(ControlService) {
    return ControlService.reset();
  }
}());
