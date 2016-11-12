(function() {
"use strict";

angular.module('common')
.factory('signUpSubmitInterceptor', SignUpSubmitInterceptor);

SignUpSubmitInterceptor.$inject = ['$rootScope', '$q'];
/**
 * Tracks when a request begins and finishes. When a
 * request starts, a progress event is emitted to allow
 * listeners to determine when a request has been initiated.
 * When the response completes or a response error occurs,
 * we assume the request has ended and emit a finish event.
 */
function SignUpSubmitInterceptor($rootScope, $q) {

  var signupSubmitInvalid = 'signup_submit:invalid';

  return {
    request: function (config) {
      //console.log("Inside interceptor, config: ", config);
      return config;
    },

    response: function (response) {
      $rootScope.$broadcast(signupSubmitInvalid, {on: false});
      return response;
    },

    responseError: function (response) {
      $rootScope.$broadcast(signupSubmitInvalid, {on: true});
      return $q.reject(response);
    }
  };
}

})();
