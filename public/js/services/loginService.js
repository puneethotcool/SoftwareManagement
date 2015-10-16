angular.module('loginService', [])

	// super simple service
	// each function returns a promise object 
	.factory('loginServ', ['$http',function($http) {
		return {
			authenticateUser : function(loginData) {
				console.log('loginService');
				return $http.post('/authenticate', loginData);
			},

			signUp : function(userData){
				console.log('sign up user called');
				//return $http.post('/api/signup', userData);
				return  $http({ // Accessing the Angular $http Service to send data via REST Communication to Node Server.
					method: 'POST',
					url: '/api/signup',
					data:  userData ,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				})
			}
			
		}
	}]);