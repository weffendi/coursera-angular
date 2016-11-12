(function () {
"use strict";

angular.module('public')
.component('myinfo', {
  templateUrl: 'src/public/myinfo/myinfo-details.html',
  controller: MyInfoComponentController
});

MyInfoComponentController.$inject = ['SignUpService'];
function MyInfoComponentController(SignUpService) {
  var $ctrl = this;

  $ctrl.myinfo = SignUpService.getMyInfo();

  // Get the menuItem via async $http call of SignUpService
  var menuid = $ctrl.myinfo.favmenuid;
  $ctrl.menuItem = {};
  function myCallback(response) {
    $ctrl.menuItem = response.data;
  };
  SignUpService.getMenuItem(menuid,myCallback);
};

})();
