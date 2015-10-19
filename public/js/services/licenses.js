angular.module('licenseService', [])
	// each function returns a promise object
	.factory('Licenses', ['$http','$rootScope',function($http,$rootScope) {
		return {
			view : function() {
				console.log('view Licenses called');
				return $http.get('/api/viewLicense/'+$rootScope.loggedUser);
			},

			viewIssuedLicense : function() {
				console.log('viewIssuedLicense called');
				return $http.get('/api/viewIssuedLicense/');
			},

			getSoftwareList : function() {
				console.log('view Licenses called');
				return $http.get('/api/getSoftwareList/');
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

			addLicenseToMaster : function(userData){
				console.log('addLicenseToMaster called');
				return  $http({ // Accessing the Angular $http Service to send data via REST Communication to Node Server.
					method: 'POST',
					url: '/api/addLicenseToMaster',
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


			viewRequestList : function() {
				console.log('view RequestList called');
				return $http.get('/api/viewMyRequests/' + $rootScope.loggedUser);
			},

			viewpendingRequestList : function() {
				console.log('view Penidng RequestList called');
				return $http.get('/api/viewMyPendingRequests/' + $rootScope.loggedUser);
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