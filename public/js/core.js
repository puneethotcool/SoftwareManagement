var licenseManagementApp = angular.module('licenseManagement', [
					'ui.router',
					'licenseControllers',
					'licenseService'
])
.config(function($stateProvider, $urlRouterProvider) {
		 $urlRouterProvider.otherwise('/viewLicense');

		  $stateProvider
		  .state('viewLicense', {
            url: "/viewLicense",
            templateUrl: 'view/viewLicense.html',
            controller: 'viewLicenseCtrl'
        })
		  .state('login',{
		  	url:"/login",
		  	templateUrl: 'view/login.html',
		  	controller: 'loginCtrl' 
		  });
	});