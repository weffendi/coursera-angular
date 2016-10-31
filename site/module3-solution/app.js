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
    }
  };

  return ddo;
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;

  list.found = [];

  list.narrowItDown = function() {
    console.log(list.searchTerm);
    list.found = MenuSearchService.getMatchedMenuItems(list.searchTerm);
  }

  list.removeItem = function (itemIndex) {
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
    }).then(function (result) {
      var foundItems = [];
      var menu_items = result.data.menu_items;
      var item = ""
      for (var idx in menu_items) {
         item = menu_items[idx];
         if (item.description.search(searchTerm) != -1) {
           foundItems.push(item);
         };
      }
    });
  }
}

})();
