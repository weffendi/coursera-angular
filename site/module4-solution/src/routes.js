(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html'
  })

  // Premade list page
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/menuapp/templates/menuapp.template.html',
    controller: 'CategoriesController as categories',
    resolve: {
      categoryList: ['MenuDataService', function(MenuDataService) {
        return MenuDataService.getAllCategories();
        }]
    }
  })

  // Item detail
  .state('categories.items', {
    url: '/category-items/{categoryId}',
    templateUrl: 'src/data/templates/items.template.html',
    controller: 'ItemsController as items',
    resolve: {
      //categoryId: null,
      categoryItems: ['$stateParams', 'categoryList','MenuDataService',
        function($stateParams, categoryList, MenuDataService) {
          var category = categoryList.data[$stateParams.categoryId];
          return MenuDataService.getItemsForCategory(category.short_name);
        }]
    }
  });

}

})();
