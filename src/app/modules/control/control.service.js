(function() {
  'use strict';

  /**
   * @namespace   Services
   */
  angular
    .module('talkingHeadFrontend.modules.control')
    .factory('ControlService', ControlService)
    .factory('HistoryService', HistoryService);

  //////////

  /**
   * @ngInject
   *
   * @param {*} $http
   * @param {*} $q
   * @param {*} config
   * @param {*} HistoryService
   * @returns {{
   *    talk: talk,
   *    reset: reset,
   *    command: command
   *  }}
   * @constructor
   */
  function ControlService(
    $http, $q,
    config,
    HistoryService
  ) {
    return {
      talk: talk,
      reset: reset,
      command: command
    };

    //////////

    function talk(phrase, language) {
      HistoryService.push({
        date: new Date(),
        phrase: phrase
      });

      return $http.get(_getBackendUrl() + language + '/' + phrase);
    }

    function reset() {
      return $q.all([
        $http.get(_getBackendUrl() + 'turn/left-eye/50'),
        $http.get(_getBackendUrl() + 'turn/right-eye/50')
      ]);
    }

    function command(command) {
      return $http.get(_getBackendUrl() + command);
    }

    function _getBackendUrl() {
      return config.backendUrl;
    }
  }

  function HistoryService()
  {
    var history = [];

    return history;
  }
})();
