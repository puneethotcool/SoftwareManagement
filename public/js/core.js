var licenseManagementApp = angular.module('licenseManagement', [
					'ui.router',
					'ngDialog',
					'ngMessages',
					'licenseControllers',
					'registration',
                    'issueasset',
                    'login',
					'licenseService',
					'requestasset',
					'reviewTasks',
					'transferLicense',
					'pendingRequest'
])
.config(function($stateProvider, $urlRouterProvider) {
		 $urlRouterProvider.otherwise('/');
		 
		  $stateProvider
		  .state('viewLicense', {
            url: "/viewLicense",
            templateUrl: 'view/viewLicense.html',
            controller: 'viewLicenseCtrl'
        })
		  /*.state('signUp',{
		  	url:"/signup",
		  	templateUrl: 'view/signup.html',
		  	controller: 'registrationController'
		  })*/
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
				  templateUrl: 'view/reivewTasks.html',
				  controller: 'taskListCtrl'
			  })

			   .state('requestStatus',{
				  url:"/pendingRequest",
				  templateUrl: 'view/pendingRequest.html',
				  controller: 'pendingRequestCtrl'
			  })
			  .state('addSoftware',{
				  url:"/addSoftware",
				  templateUrl: 'view/addSoftware.html',
				  controller: 'addSoftwareCtrl'
			  })
			  .state('viewIssuedLicense',{
				  url:"/viewIssuedLicense",
				  templateUrl: 'view/viewIssuedLicense.html',
				  controller: 'viewIssuedLicenseCtrl'
			  })


			  .state('transferLicense',{
		  	url:"/transferLicense",
		  	templateUrl: 'view/transferLicense.html',
		  	controller: 'transferLicenseController'
		  });
	});