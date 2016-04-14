(function() {
  'use strict';

  /**
   * Specify application configure values
   *
   * @type {{
   *    appErrorPrefix: string,
   *    appTitle:       string
   *  }}
   */
  var config = {
    appErrorPrefix: 'Badge - Error',
    appTitle: 'Badge'
  };

  /**
   * Module initialization
   *
   * @namespace Core
   */
  angular
    .module('badgeFrontend.core')
    .value('config', config)
    .config(moduleConfig)
    .run(moduleRun);

  //////////

  /**
   * @desc      Actual configure implementation for module.
   * @namespace Configure
   * @memberOf  Core
   * @ngInject
   *
   * @param {$provide}                        $provide
   * @param {$httpProvider}                   $httpProvider
   * @param {$logProvider}                    $logProvider
   * @param {$mdThemingProvider}              $mdThemingProvider
   * @param {Providers.RouterHelperProvider}  routerHelperProvider
   * @param {Providers.ExceptionHandler}      exceptionHandlerProvider
   * @param {jwtInterceptorProvider}          jwtInterceptorProvider
   * @constructor
   */
  function moduleConfig(
    $provide, $httpProvider, $logProvider, $mdThemingProvider,
    routerHelperProvider, exceptionHandlerProvider,
    jwtInterceptorProvider
  ) {
    // Add filename + line number feature to $log component
    $provide.decorator('$log', function decorator($delegate) {
      var originalFunctions = {};

      // Store the original log functions
      angular.forEach($delegate, function iterator(originalFunction, functionName) {
        originalFunctions[functionName] = originalFunction;
      });

      var functionsToDecorate = ['log', 'info', 'warn', 'error', 'debug'];

      // Apply the decorations
      angular.forEach(functionsToDecorate, function iterator(functionName) {
        $delegate[functionName] = logDecorator(originalFunctions[functionName]);
      });

      return $delegate;
    });

    if ($logProvider.debugEnabled) {
      $logProvider.debugEnabled(true);
    }

    jwtInterceptorProvider.tokenGetter = ['$localStorage', function($localStorage) {
      return $localStorage.token;
    }];

    $httpProvider.interceptors.push('jwtInterceptor');
    $httpProvider.interceptors.push('ErrorInterceptor');

    // Configure material design palettes
    $mdThemingProvider
      .theme('default')
      .primaryPalette('blue')
      .accentPalette('light-blue');

    // Configure exception handler provider
    exceptionHandlerProvider.configure(config.appErrorPrefix);

    // Configure router helper provider
    routerHelperProvider.configure({docTitle: config.appTitle + ': '});
  }

  /**
   * $log decorator function, this is needed to add filename and line number to each $log command.
   *
   * @param   {function}  func
   * @returns {function}
   */
  function logDecorator(func) {
    return function anon() {
      var args = [].slice.call(arguments);

      // Insert a separator between the existing log message(s) and what we're adding.
      args.push(' - ');

      // Use (instance of Error)'s stack to get the current line.
      var stack = (new Error()).stack.split('\n').slice(1);

      /**
       * Throw away the first item because it is the `$log.fn()` function,
       * but we want the code that called `$log.fn()`.
       */
      stack.shift();

      // We only want the top line, thanks.
      stack = stack.slice(1, 2);

      // Put it on the args stack.
      args.push(stack);

      // Call the original function with the new args.
      func.apply(func, args);
    };
  }

  /**
   * @desc      Run block implementation for application.
   * @namespace Run
   * @memberOf  Core
   * @ngInject
   *
   * @param {*}                     $rootScope
   * @param {*}                     $state
   * @param {*}                     $localStorage
   * @param {Services.AuthService}  AuthService
   * @param {Services.UserService}  UserService
   */
  function moduleRun(
    $rootScope, $state, $localStorage,
    AuthService, UserService
  ) {
    $rootScope.user = UserService.user();

    // On reload check user data
    _checkUser();

    /**
     * Route state change start event, this is needed for following:
     *  1) Check if user is authenticated to access page, and if not redirect user back to login page
     */
    $rootScope.$on('$stateChangeStart', function stateChangeStart(event, toState) {
      // On state change start check user data
      _checkUser();

      if (toState.hasOwnProperty('data') &&
        toState.data.hasOwnProperty('access') &&
        !AuthService.authorize(toState.data.access)
      ) {
        event.preventDefault();

        $state.go('auth.login');
      }
    });

    $rootScope.$watch(function() {
      return angular.toJson($localStorage);
    }, function() {
      $rootScope.user = UserService.user();
    });

    ////////// Private function

    /**
     * Private helper function to check that user token is valid or not. If token has expired we need to erase it from
     * local storage to make sure that everything works in application as smooth as possible.
     *
     * @private
     */
    function _checkUser() {
      if (AuthService.isAuthenticated(true) === false) {
        delete $localStorage.token;
      }
    }
  }
})();
