(function() {
  'use strict';

  /**
   * @namespace Interceptors
   */
  angular
    .module('badgeFrontend.core.interceptors')
    .factory('ErrorInterceptor', ErrorInterceptor);

  //////////

  /**
   * @description Generic error interceptor for application
   * @namespace   ErrorInterceptor
   * @memberOf    Interceptors
   * @ngInject
   *
   * @param $q
   * @param $injector
   * @returns {{
   *    responseError: Interceptors.ErrorInterceptor.responseError
   *  }}
   * @constructor
   */
  function ErrorInterceptor($q, $injector) {
    return {
      responseError: responseError
    };

    //////////

    /**
     * @name      getStatusCodeText
     * @memberOf  Interceptors.ErrorInterceptor
     *
     * @param response
     * @returns {*}
     */
    function responseError(response) {
      var message = '';
      var subTitle = '';

      if (response.data && response.data.error) {
        message = response.data.error;
      } else if (response.data && response.data.message) {
        message = response.data.message;
      } else {
        if (typeof response.data === 'string') {
          message = response.data;
        } else if (response.statusText) {
          message = response.statusText;
        } else if (response.status === 0) {
          message = 'CORS error with url \'' + response.config.url + '\'';
        } else {
          message = $injector.get('HttpStatusService').getStatusCodeText(response.status);
        }

        if (response.status !== 0) {
          subTitle = 'HTTP status ' + response.status;
        }
      }

      if (message) {
        $injector
          .get('$mdToast')
          .showSimple(subTitle + ' ' + message);
      }

      return $q.reject(response);
    }
  }
})();