/*angular.module('loginService', [])
.factory('login', ['$http','$scope','$window',function($scope, $http, $window){
	return {
		authenticateUser: function(loginData){
			console.log('user data in service'+ loginData);
			
			$http.post('/authenticate', loginData)
			  .success(function (data, status, headers, config) {
		        $window.sessionStorage.token = data.token;
		        $scope.isAuthenticated = true;
		        var encodedProfile = data.token.split('.')[1];
		        var profile = JSON.parse(url_base64_decode(encodedProfile));
		        $scope.welcome = 'Welcome ' + profile.first_name + ' ' + profile.last_name;
		      })
		      .error(function (data, status, headers, config) {
		        // Erase the token if the user fails to log in
		        delete $window.sessionStorage.token;
		        $scope.isAuthenticated = false;

		        // Handle login errors here
		        $scope.error = 'Error: Invalid user or password';
		      });
		}
	}
}]);*/

angular.module('loginService', [])

	// super simple service
	// each function returns a promise object 
	.factory('loginServ', ['$http',function($http) {
		return {
			authenticateUser : function(loginData) {
				console.log('loginService');
				return $http.post('/authenticate', loginData);
			}
			
		}
	}]);