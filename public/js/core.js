var licenseManagementApp = angular.module('licenseManagement', [
					'ui.router',
					'ngMessages',
					'licenseControllers',
					'registration',
                    'issueasset',
                    'login',
					'licenseService'
])
.config(function($stateProvider, $urlRouterProvider) {
		 $urlRouterProvider.otherwise('/');
		 
		  $stateProvider
		  .state('viewLicense', {
            url: "/viewLicense",
            templateUrl: 'view/viewLicense.html',
            controller: 'viewLicenseCtrl'
        })
		  .state('signUp',{
		  	url:"/signup",
		  	templateUrl: 'view/signup.html',
		  	controller: 'registrationController'
		  })
              .state('issueLicenses',{
				  url:"/issueLicenses",
				  templateUrl: 'view/issueLicense.html',
				  controller: 'issueLicenseCtrl'
			  });
	});