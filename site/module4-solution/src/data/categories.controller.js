(function () {
'use strict';

angular.module('Data')
.controller('CategoriesController', CategoriesController);

// Version with resolving to 1 item based on $stateParams in route config
CategoriesController.$inject = ['MenuDataService','categoryList'];
function CategoriesController(MenuDataService,categoryList) {
  var categories = this;
  categories.categories = categoryList.data;
  }
})();
