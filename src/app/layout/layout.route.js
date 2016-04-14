(function() {
  'use strict';

  /**
   * Specify run block for talkingHeadFrontend.layout module.
   *
   * @namespace Routes
   */
  angular
    .module('talkingHeadFrontend.layout')
    .run(moduleRun);

  //////////

  /**
   * @desc      Run block for talkingHeadFrontend.layout module.
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
        state: 'talkingHeadFrontend',
        config: {
          abstract: true,
          views: {
            header: {
              templateUrl: '/talking-head-frontend/layout/header.html',
              controller: 'HeaderController',
              controllerAs: 'vm'
            },
            footer: {
              templateUrl: '/talking-head-frontend/layout/footer.html',
              controller: 'FooterController',
              controllerAs: 'vm'
            }
          }
        }
      }
    ];
  }
})();
