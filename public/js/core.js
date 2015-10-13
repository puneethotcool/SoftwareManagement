var licenseManagementApp = angular.module('licenseManagement', [
					'ui.router',
					'ngMessages',
					'licenseControllers',
					'registration',
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
		  	url:"/signup",
		  	templateUrl: 'view/signup.html',
		  	controller: 'registrationController'
		  });
	});