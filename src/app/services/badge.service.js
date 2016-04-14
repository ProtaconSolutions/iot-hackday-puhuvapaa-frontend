(function() {
  'use strict';

  /**
   * @namespace   Services
   */
  angular
    .module('badgeFrontend.services')
    .factory('BadgeService', BadgeService);

  //////////

  /**
   * @description BadgeService
   * @namespace   BadgeService
   * @memberOf    Services
   * @ngInject
   *
   * @param {RestService} RestService
   * @returns {*}
   * @constructor
   */
  function BadgeService(RestService) {
    return new RestService('badge');
  }
})();
