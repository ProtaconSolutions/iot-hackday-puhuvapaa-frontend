/* global moment:false, _: false */
(function() {
  'use strict';

  /**
   * Specify core constant values
   *
   * @namespace Constants
   * @memberOf  Core
   */
  angular
    .module('badgeFrontend.core')
    .constant('moment', moment)
    .constant('_', _);
})();
