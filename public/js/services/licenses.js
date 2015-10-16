angular.module('licenseService', [])
	// each function returns a promise object
	.factory('Licenses', ['$http','$rootScope',function($http,$rootScope) {
		return {
			view : function() {
				console.log('view Licenses called');
				return $http.get('/api/viewLicense/'+$rootScope.loggedUser);
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
			},

			issueLicense : function(userData){
				console.log('issue license called');
				return  $http({ // Accessing the Angular $http Service to send data via REST Communication to Node Server.
					method: 'POST',
					url: '/api/issueLicense',
					data:  userData ,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				})
			},

			requestLicense : function(userData){
				console.log('request license called');
				console.log('DATA: '+userData);
				return  $http({ // Accessing the Angular $http Service to send data via REST Communication to Node Server.
					method: 'POST',
					url: '/api/requestLicense',
					data:  userData ,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				})
			},

			transfer : function(userData){
				console.log('Transferring Asset');
				//return $http.post('/api/signup', userData);
				return  $http({ // Accessing the Angular $http Service to send data via REST Communication to Node Server.
					method: 'POST',
					url: '/api/transfer',
					data:  userData ,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				})
			}
		}
	}]);