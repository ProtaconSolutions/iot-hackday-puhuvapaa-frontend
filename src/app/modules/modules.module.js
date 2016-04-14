(function() {
  'use strict';

  /**
   * Initialization of badgeFrontend.modules module.
   *
   * @namespace Modules
   */
  angular
    .module('badgeFrontend.modules', [
      'badgeFrontend.modules.home',
      'badgeFrontend.modules.badges'
    ]);
})();
