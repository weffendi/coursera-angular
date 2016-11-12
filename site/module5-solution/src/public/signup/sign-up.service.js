(function () {
'use strict';

angular.module('public')
.service('SignUpService', SignUpService)
.constant('ApiPath', 'https://weffendi-course5.herokuapp.com')

SignUpService.$inject = ['$http', 'ApiPath']
function SignUpService($http, ApiPath) {
  var service = this;

  service.checkMenuId = function(menuid) {
    var promise = $http({
      method: "GET",
      url: (ApiPath + "/menu_items/" + menuid + ".json")
    });
    //console.log("inside SignUpService  checkMenuId for: ", menuid)
    return promise;
  }

  service.persist = function(data) {
    service.user_info = data;
  }

  service.getMyInfo = function() {
    if (service.user_info) {
      var deep_copy_user_info = JSON.parse(JSON.stringify(service.user_info));
      return deep_copy_user_info;
    } else {
      return {};
    }

  };

  service.getMenuItem = function(menuid, callback) {
    $http.get(ApiPath + '/menu_items/' + menuid  +'.json').then(function (response) {
      callback(response);
    });
  };

}

})();
