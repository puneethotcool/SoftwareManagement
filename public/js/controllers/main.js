angular.module('licenseControllers', [])
	// inject the Todo service factory into our controller
	.controller('viewLicenseCtrl', ['$scope','$http','Licenses' ,function($scope, $http,Licenses) {

		Licenses.view()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
			});



	}]);