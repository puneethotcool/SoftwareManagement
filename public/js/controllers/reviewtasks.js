/**
 * Created by Ishwarya on 16-10-2015.
 */
var licenseMgmtApp = angular.module('reviewTasks', ['ngDialog']);
licenseMgmtApp.controller('taskListCtrl', ['$scope','$rootScope','Licenses','ngDialog',function ($scope,$rootScope,Licenses,ngDialog) {
   
    Licenses.viewRequestList()
        .success(function(data) {
            $scope.reviewTaskData = data;
        });
}]);

licenseMgmtApp.controller('processTransferCtrl', ['$scope','$rootScope','Licenses','ngDialog',function ($scope,$rootScope,Licenses,ngDialog) {
  // var requestedSoftware; 

  $scope.filterSelectedAsset = function(asset){
   return  asset.metadataOfIssuence.data.assetName === $scope.requestedLicense.softwareName;
  }

  $scope.transferLicense = function(asset){
    var assetId = asset.assetId;
    var fromUserId = $rootScope.loggedUser;
    var toUserId = $scope.requestedLicense.userName;
    var requestRecordId =  $scope.requestedLicense.requestRecordId;

    var data = {'fromId' : fromUserId,
                'toId' : toUserId ,
                'assetId' : assetId,
                'requestRecordId': requestRecordId};
    // var finalData = angular.toJson(data);
    var finalData = 'mydata='+JSON.stringify(data);
    console.log(data +' -----------------'+ finalData);
    Licenses.transfer(finalData);
    
    console.log('transferLicense -'  + assetId +' : '+ fromUserId +' : '+ toUserId + ' : '+requestRecordId);

  }

  $scope.processTransfer = function(request){
     $scope.requestedLicense = {};
     $scope.requestedLicense.softwareName = request.software;
     $scope.requestedLicense.userName = request.username;
     $scope.requestedLicense.requestRecordId = request.id;
     // $scope.requestedSoftware = request.software;
  		Licenses.view()
  			.success(function(data) {
            console.log("processTransfer fff :::"+JSON.stringify(data));

            $scope.availableLicense = {};
            $scope.availableLicense.allList = data;

            ngDialog.open({
                    template: '../../view/template/transferLicenseTemplate.html',
                    controller: 'taskListCtrl',
                    scope: $scope,
                    className: 'ngdialog-theme-plain'
                });

        });

  	}
}]);
