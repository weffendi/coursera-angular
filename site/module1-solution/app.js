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
    // default to error if no entry
    $scope.customFontColor = "red";
    if (lunchOrders === "") {
      $scope.checkLunchMessage = "Please enter data first";
      return;
    }
    // if no error then font color is green
    $scope.customFontColor = "green";
    var orders = $scope.lunchOrders.split(',')
                  .filter(function(str) {return str.trim().length>0});
    if (orders.length <= 3) {
      $scope.checkLunchMessage = "Enjoy!";
    } else {
      $scope.checkLunchMessage = "Too much!";
    }
  };
}

})();
