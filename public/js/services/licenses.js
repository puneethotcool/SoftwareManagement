angular.module('licenseService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Licenses', ['$http',function($http) {
		return {
			view : function() {
				console.log('view Licenses called');
				return $http.get('/api/viewLicense');
			}/*,
			create : function(todoData) {
				return $http.post('/api/todos', todoData);
			},
			delete : function(id) {
				return $http.delete('/api/todos/' + id);
			}*/
		}
	}]);