(function() {
  'use strict';

  /**
   * Specify run block for talkingHeadFrontend.modules.home module.
   *
   * @namespace Routes
   */
  angular
    .module('talkingHeadFrontend.modules.home')
    .run(moduleRun);

  //////////

  /**
   * @desc      Run block for talkingHeadFrontend.modules.home module.
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
   * @desc      Getter method for talkingHeadFrontend.modules.home module route definitions.
   * @memberOf  Routes.Home
   *
   * @returns {*[]}
   */
  function getStates() {
    return [
      {
        state: 'modules.home',
        config: {
          url: '/',
          title: 'Home',
          views: {
            'content@': {
              templateUrl: '/talking-head-frontend/modules/home/home.html',
              controller: 'homeController',
              controllerAs: 'vm'
            }
          }
        }
      }
    ];
  }
}());
