(function () {
'use strict';

angular.module('Data')
.controller('MenuDataController', MenuDataController);


MenuDataController.$inject = ['MenuDataService', 'categories'];
function MenuDataController(MenuDataService, categories) {
  var menuData = this;
  menuData.categories = categories;
}

})();
