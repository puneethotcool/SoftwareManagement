/**
 * Created by Ishwarya on 16-10-2015.
 */
var licenseMgmtApp = angular.module('pendingRequest', []);
licenseMgmtApp.controller('pendingRequestCtrl', ['$scope','$rootScope','Licenses',function ($scope,$rootScope,Licenses) {
    Licenses.viewRequestList()
        .success(function(data) {
            console.log(data);
            console.log("Stingify:::"+JSON.stringify(data));
            $scope.reviewpendingRequestData = data;
        });
}]);






