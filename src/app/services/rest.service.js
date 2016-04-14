(function() {
  'use strict';

  /**
   * @namespace   Services
   */
  angular
    .module('badgeFrontend.services')
    .factory('RestService', RestService);

  //////////

  /**
   * @description RestService
   * @namespace   RestService
   * @memberOf    Services
   * @ngInject
   *
   * @param {*} $http
   * @param {*} $httpParamSerializer
   * @param {*} config
   * @returns {Service}
   * @constructor
   */
  function RestService(
    $http, $httpParamSerializer,
    config
  ) {
    function Service(endpoint) {
      this.endpoint = endpoint.endsWith('/') ? endpoint : endpoint + '/';
    }

    /**
     * @name      find
     * @memberOf  Services.RestService
     *
     * @param {*} [params]
     * @returns {*}
     */
    Service.prototype.find = function(params) {
      var _this = this;

      params = params || {};

      var query = $httpParamSerializer(params);

      return $http.get(_this._getUrl() + (query ? '?' + query : ''));
    };

    /**
     * @name      findOne
     * @memberOf  Services.RestService
     *
     * @param {number}  id
     * @returns {*}
     */
    Service.prototype.findOne = function(id) {
      var _this = this;

      return $http.get(_this._getUrl(id));
    };

    /**
     * @name      create
     * @memberOf  Services.RestService
     *
     * @param {{}}  data
     * @returns {*}
     */
    Service.prototype.create = function(data) {
      var _this = this;

      return $http.post(_this._getUrl(), data);
    };

    /**
     * @name      update
     * @memberOf  Services.RestService
     *
     * @param {number}  id
     * @param {{}}      data
     * @returns {*}
     */
    Service.prototype.update = function(id, data) {
      var _this = this;

      return $http.put(_this._getUrl(id), data);
    };

    /**
     * @name      remove
     * @memberOf  Services.RestService
     *
     * @param {number}  id
     * @returns {*|boolean}
     */
    Service.prototype.remove = function(id) {
      var _this = this;

      return $http.delete(_this._getUrl(id));
    };

    ////////// Private

    /**
     * Helper function to return backend url end point for this service.
     *
     * @param {string|number} [suffix]
     * @returns {string}
     * @private
     */
    Service.prototype._getUrl = function(suffix) {
      var _this = this;

      suffix = suffix || '';

      return config.backendUrl + _this.endpoint + suffix;
    };

    return Service;
  }
})();
