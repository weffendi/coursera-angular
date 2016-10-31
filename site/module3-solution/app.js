(function () {
'use strict';


angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;

  list.found = [];

  list.narrowItDown = function() {
    var promise = MenuSearchService.getMatchedMenuItems(list.searchTerm);

    promise.then(function (result) {
      var foundItems = [];
      var menu_items = result.data.menu_items;
      var item = ""
      for (var idx in menu_items) {
         item = menu_items[idx];
         if (item.description.search(list.searchTerm) != -1) {
           foundItems.push(item);
         };
      }
      list.found = foundItems;
    });
  }

  list.removeItem = function (itemIndex) {
    console.log("blah");
    console.log("remove on index: ", itemIndex);
    list.found.splice(itemIndex, 1);
  };
}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });
    return response;
  }
}

})();
