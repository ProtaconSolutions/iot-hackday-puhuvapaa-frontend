(function() {
  'use strict';

  /**
   * Initialization of talkingHeadFrontend.core module.
   *
   * @namespace Modules
   */
  angular
    .module('talkingHeadFrontend.core', [
      'talkingHeadFrontend.core.interceptors', 'talkingHeadFrontend.core.services',
      'talking-head-frontend-templates',
      'blocks.exception', 'blocks.logger', 'blocks.router'
    ]);
})();
