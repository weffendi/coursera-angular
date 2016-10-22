(function () {
'use strict';

angular.module('ShoppingListCheckOffApp', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyList = this;

  toBuyList.items = ShoppingListCheckOffService.getToBuyItems();

  toBuyList.bought = function (itemIndex) {
    ShoppingListCheckOffService.bought(itemIndex);
  };
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtList = this;

  boughtList.items = ShoppingListCheckOffService.getBoughtItems();
}


function ShoppingListCheckOffService() {
  var service = this;

  // List of 'To Buy and Already Bought' shopping items
  var toBuyItems = [
    { name: "cookies", quantity: 10 },
    { name: "coke", quantity: 2 },
    { name: "bread", quantity: 1 },
    { name: "milk", quantity: 1 },
    { name: "yogurt", quantity: 6 }
  ];
  var boughtItems = [];

  service.bought = function (itemIndex) {
    boughtItems.push(toBuyItems[itemIndex]);
    toBuyItems.splice(itemIndex, 1);
  };

  service.getToBuyItems = function () {
    return toBuyItems;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };
}

})();
