(function () {
'use strict';

angular.module('LunchCheckApp', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
  $scope.lunchOrders = "";
  $scope.checkLunchMessage = "";

  $scope.checkOrder = function () {
    var lunchOrders = $scope.lunchOrders;

    // default to green
    $scope.customFontColor = "green";
    var orders = $scope.lunchOrders.split(',')
                  .filter(function(str) {return str.trim().length>0});
    if (orders.length == 0) {
      // empty data so make it red
      $scope.customFontColor = "red";
      $scope.checkLunchMessage = "Please enter data first";
    }
    else if (orders.length <= 3) {
      $scope.checkLunchMessage = "Enjoy!";
    } else {
      $scope.checkLunchMessage = "Too much!";
    }
  };
}

})();
