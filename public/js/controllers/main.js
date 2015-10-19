var app =angular.module('licenseControllers', []);
// inject the Todo service factory into our controller
	app.controller('viewLicenseCtrl', ['$scope','$http','Licenses' ,function($scope, $http,Licenses) {

		Licenses.view()
			.success(function(data) {
				console.log('data: '+ JSON.stringify(data));
				$scope.assetData = data;
			});



	}]);

app.controller('viewIssuedLicenseCtrl', ['$scope','$http','Licenses' ,function($scope, $http,Licenses) {
		Licenses.viewIssuedLicense()
		.success(function(data) {
			console.log('data: '+ JSON.stringify(data));
			$scope.assetData = data;
		});



}]);

