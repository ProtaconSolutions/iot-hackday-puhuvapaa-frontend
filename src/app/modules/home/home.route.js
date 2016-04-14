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
  Commit failed with error:
  pathspec 'src/app/core/auth/services/AuthService.js' did not match any file(s) known to git.
    error: pathspec 'src/app/modules/badges/badges.html' did not match any file(s) known to git.
    error: pathspec 'src/app/core/auth/auth.route.js' did not match any file(s) known to git.
    error: pathspec 'src/app/modules/badges/badges.module.js' did not match any file(s) known to git.
    error: pathspec 'src/app/core/auth/login/login.html' did not match any file(s) known to git.
    error: pathspec 'src/app/core/auth/login/login.module.js' did not match any file(s) known to git.
    error: pathspec 'src/app/core/auth/profile/profile.controller.js' did not match any file(s) known to git.
    error: pathspec 'src/app/core/auth/constants/AccessLevels.js' did not match any file(s) known to git.
    error: pathspec 'src/app/core/auth/constants/constants.module.js' did not match any file(s) known to git.
    error: pathspec 'src/app/core/auth/auth.module.js' did not match any file(s) known to git.
    error: pathspec 'src/app/core/auth/services/UserService.js' did not match any file(s) known to git.
    error: pathspec 'src/app/core/auth/login/login.controller.js' did not match any file(s) known to git.
    error: pathspec 'src/app/core/auth/profile/profile.html' did not match any file(s) known to git.
    error: pathspec 'src/app/modules/badges/badges.controller.js' did not match any file(s) known to git.
    error: pathspec 'src/app/core/auth/login/login.scss' did not match any file(s) known to git.
    error: pathspec 'src/app/core/auth/profile/profile.module.js' did not match any file(s) known to git.
    error: pathspec 'src/app/core/auth/profile/profile.route.js' did not match any file(s) known to git.
    error: pathspec 'src/app/modules/badges/badges.route.js' did not match any file(s) known to git.
    error: pathspec 'src/app/core/auth/services/services.module.js' did not match any file(s) known to git.
    error: pathspec 'src/app/core/auth/login/login.route.js' did not match any file(s) known to git.
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
