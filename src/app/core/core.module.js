(function() {
  'use strict';

  /**
   * Initialization of badgeFrontend.core module.
   *
   * @namespace Modules
   */
  angular
    .module('badgeFrontend.core', [
      'badgeFrontend.core.auth', 'badgeFrontend.core.interceptors', 'badgeFrontend.core.services',
      'badge-frontend-templates',
      'blocks.exception', 'blocks.logger', 'blocks.router'
    ]);
})();
