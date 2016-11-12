(function () {
"use strict";

angular.module('public')
.component('signup', {
  templateUrl: 'src/public/signup/signup-details.html',
  controller: SignUpComponentController
});

SignUpComponentController.$inject = ['$rootScope','SignUpService'];
function SignUpComponentController($rootScope, SignUpService) {
  var $ctrl = this;
  var listener;

  // hardcode value to save test time
  $ctrl.user = {};
  //$ctrl.user.phone = '267-945-9995';
  //$ctrl.user.favmenuid = 'B10';

  $ctrl.submit = function () {
    SignUpService.checkMenuId($ctrl.user.favmenuid);
  }

  $ctrl.$onInit = function() {
    listener = $rootScope.$on('signup_submit:invalid', checkMenuIdInvalidity);
  };

  $ctrl.$onDestroy = function() {
    listener();
  };

  function checkMenuIdInvalidity(event, data) {
    var menuIdInvalid = data.on;
    if (menuIdInvalid) {
      $ctrl.user.menuid_invalid = true;
      $ctrl.user.completed = false;
    } else {
      $ctrl.user.menuid_invalid = false;
      SignUpService.persist($ctrl.user);
      $ctrl.user.completed = true;
    }
  }
}


})();
