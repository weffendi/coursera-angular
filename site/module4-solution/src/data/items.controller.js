(function () {
'use strict';

angular.module('Data')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['MenuDataService', '$stateParams', 'categoryItems'];
function ItemsController(MenuDataService, $stateParams, categoryItems) {
  var items = this;
  items.items = categoryItems.data.menu_items;
}

})();
