var licenseManagementApp = angular.module('licenseManagement', [
					'ui.router',
					'ngMessages',
					'licenseControllers',
					'registration',
                    'issueasset',
                    'login',
					'licenseService',
					'requestasset',
					'reviewTasks'
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
			  })
			  .state('requestLicense',{
				  url:"/requestLicense",
				  templateUrl: 'view/requestsoftware.html',
				  controller: 'requestLicenseCtrl'
			  })
			  .state('taskList',{
				  url:"/taskList",
				  templateUrl: 'view/taskList.html',
				  controller: 'taskListCtrl'
			  });
	});