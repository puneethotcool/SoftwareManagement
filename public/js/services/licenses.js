angular.module('licenseService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Licenses', ['$http',function($http) {
		return {
			view : function() {
				console.log('view Licenses called');
				return $http.get('/api/viewLicense');
			},/*,
			create : function(todoData) {
				return $http.post('/api/todos', todoData);
			},
			delete : function(id) {
				return $http.delete('/api/todos/' + id);
			}*/
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