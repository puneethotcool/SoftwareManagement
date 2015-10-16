var myApp = angular.module('login', []);

//this is used to parse the profile
function url_base64_decode(str) {
  var output = str.replace('-', '+').replace('_', '/');
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += '==';
      break;
    case 3:
      output += '=';
      break;
    default:
      throw 'Illegal base64url string!';
  }
  return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
}

myApp.controller('loginCtrl', function ($scope, $http, $window,$rootScope) { 

  $scope.isAuthenticated = false;
 
  /*$scope.welcome = '';
  $scope.message = '';*/
  $scope.loginForm = {};
  $scope.loginForm.username = '';
  $scope.loginForm.password = '';

  $scope.login = function () {

    var jdata = JSON.stringify($scope.loginForm);
    console.log('user data '+ jdata);

      $scope.loginForm.username = '';
      $scope.loginForm.password = '';
      console.log('inside login ctrl');
 /*     loginServ.authenticateUser(jdata);*/

    $http.post('/authenticate', jdata)
      .success(function (data, status, headers, config) {
        $window.sessionStorage.token = data.token;
        $scope.isAuthenticated = true;
        var encodedProfile = data.token.split('.')[1];
        var profile = JSON.parse(url_base64_decode(encodedProfile));
        setuserProfile(profile);

      })
      .error(function (data, status, headers, config) {
        // Erase the token if the user fails to log in
        delete $window.sessionStorage.token;
        $scope.isAuthenticated = false;
        $scope.loginError = 'Invalid username or password';
        // Handle login errors here
        
      });
  };

  setuserProfile = function(profile){
        $scope.welcome = 'Welcome ' + profile.first_name + ' ' + profile.last_name;
        $rootScope.loggedUser = profile.id;
        $rootScope.isAdminUser = ($rootScope.loggedUser == "admin");
  }

  $scope.logout = function () {
    $scope.isAuthenticated = false;
    $scope.loginError = false;

    delete $window.sessionStorage.token;
  };
/*
  $scope.callRestricted = function () {
    $http({url: '/api/restricted', method: 'GET'})
    .success(function (data, status, headers, config) {
      $scope.message = $scope.message + ' ' + data.name; // Should log 'foo'
    })
    .error(function (data, status, headers, config) {
      alert(data);
    });
  };
*/
});

myApp.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
      }
      return config;
    },
    responseError: function (rejection) {
      if (rejection.status === 401) {
        // handle the case where the user is not authenticated
      }
      return $q.reject(rejection);
    }
  };
});

myApp.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});
