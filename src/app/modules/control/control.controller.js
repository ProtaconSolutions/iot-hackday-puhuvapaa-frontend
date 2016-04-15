(function() {
  'use strict';

  /**
   * Specify controller for talkingHeadFrontend.modules.control module.
   *
   * @namespace Controllers
   */
  angular
    .module('talkingHeadFrontend.modules.control')
    .controller('controlController', controlController);

  //////////

  /**
   * @desc      Controller implementation for following route:
   *              url:    /
   *              state:  modules.control
   * @namespace control
   * @memberOf  Controllers
   * @ngInject
   *
   * @constructor
   */
  function controlController(
    $scope, $interval,
    _,
    ControlService
  ) {
    var vm = this;

    // Default values
    vm.phrase = '';
    vm.phrases = '';
    vm.autopilot = false;
    vm.autopilotInterval = 60;
    vm.crazyTime = 10;
    vm.eyeLeft = 50;
    vm.eyeRight = 50;

    // Functions
    vm.talk = talk;
    vm.talkFast = talkFast;
    vm.toggleAutopilot = toggleAutopilot;
    vm.moveSlash = moveSlash;
    vm.eyesLeft = eyesLeft;
    vm.eyesRight = eyesRight;
    vm.eyesRandom = eyesRandom;
    vm.eyeMove = eyeMove;
    vm.crazy = crazy;

    // Watcher
    $scope.$watch('vm.eyeLeft', watcherEyeLeft);
    $scope.$watch('vm.eyeRight', watcherEyeRight);

    //////////

    var interval;
    var values = _.range(0, 100, 10);

    function talk(phrase, language) {
      vm.phrase = '';

      ControlService.talk(phrase, language);
    }

    function talkFast(keyEvent) {
      if (keyEvent.which === 13) {
        talk(vm.phrase, 'suomi');
      }
    }

    function toggleAutopilot() {
      vm.autopilot = !vm.autopilot;

      var time = parseInt(vm.autopilotInterval, 10);

      time = _.isNumber(time) ? time * 1000 : 900000;

      if (!vm.autopilot) {
        $interval.cancel(interval);
      } else {
        talk(_.sample(vm.phrases), 'suomi');

        interval = $interval(function() {
          talk(_.sample(vm.phrases), 'suomi');
        }, time);
      }
    }

    function moveSlash(type) {
      var commands = [];

      switch (type) {
        case 1: // Neutral
          commands.push('turn/left-brow/50');
          commands.push('turn/right-brow/50');
          break;
        case 2: // Random
          commands.push('turn/left-brow/' + _.sample(values));
          commands.push('turn/right-brow/' + _.sample(values));
          break;
        case 3: // Angry
          commands.push('turn/left-brow/100');
          commands.push('turn/right-brow/0');
          break;
        case 4: // Confused
          commands.push('turn/left-brow/0');
          commands.push('turn/right-brow/100');
          break;
      }

      _.forEach(commands, function iterator(command) {
        ControlService.command(command);
      });
    }

    function eyesLeft() {
      eyeMove('eyeLeft', 0);
      eyeMove('eyeRight', 0);
    }

    function eyesRight() {
      eyeMove('eyeLeft', 1);
      eyeMove('eyeRight', 1);
    }

    function eyesRandom() {
      vm.eyeLeft = _.sample(values);
      vm.eyeRight = _.sample(values);
    }

    function eyeMove(eye, direction) {
      vm[eye] = direction === 0 ? (vm[eye] === 0 ? vm[eye] : vm[eye] - 10) : (vm[eye] === 100 ? vm[eye] : vm[eye] + 10);
    }

    function crazy(time) {
      ControlService.command('crazy/' + time);
    }

    function watcherEyeRight(valueNew, valueOld) {
      if (valueNew !== valueOld) {
        moveEye(valueNew, 'right-eye');
      }
    }

    function watcherEyeLeft(valueNew, valueOld) {
      if (valueNew !== valueOld) {
        moveEye(valueNew, 'left-eye');
      }
    }

    function moveEye(value, eye) {
      if (!_.inRange(value, 0, 100)) { // This is just for the fail safe...
        value = value < 0 ? 0 : 100;
      }

      ControlService.command('turn/' + eye + '/' + value);
    }
  }
}());
