/**
 * Created by Ishwarya on 14-10-2015.
 */
var licenseMgmtApp = angular.module('requestasset', []);

licenseMgmtApp.controller('addSoftwareCtrl', ['$scope','Licenses',function ($scope,Licenses) {
    $scope.myForm = {};
    $scope.myForm.software  = "";
    $scope.submit = function(){

        var formData = {
            'id': $scope.myForm.software,
            'name': $scope.myForm.software
        };
        $scope.myForm.software  = "";
        var jdata = 'mydata=' + JSON.stringify(formData);
        Licenses.addLicenseToMaster(jdata).success(function (response) {
            alert(response);
        });
    };
}]);

licenseMgmtApp.controller('requestLicenseCtrl', ['$scope','$rootScope','Licenses',function ($scope,$rootScope,Licenses) {
    $scope.myForm = {};
    $scope.myForm.software  = "";
    $scope.myForm.requestEndDate = "";
    $scope.myForm.output="";
    $scope.myForm.company='';
    $scope.myForm.version='';
    $scope.myForm.justification='';

    Licenses.getSoftwareList()
        .success(function(data) {
            console.log(data);
            console.log("Stingify:::"+JSON.stringify(data));
            $scope.myForm.options = data;
        });

    // Preparing the Json Data from the Angular Model to send in the Server.
    $scope.submit=function() {
        var formData = {
            'software': $scope.myForm.software,
            'requestEndDate': $scope.myForm.requestEndDate,
            'username': $rootScope.loggedUser,
            'status':'pending',
            'id': (new Date).getTime(),
            'company': $scope.myForm.company,
            'version': $scope.myForm.version,
            'justification':$scope.myForm.justification
        };
        $scope.myForm.software = "";
        $scope.myForm.requestEndDate = '';
        $scope.myForm.company='';
        $scope.myForm.version='';
        $scope.myForm.justification='';
        var jdata = 'mydata=' + JSON.stringify(formData);
        Licenses.requestLicense(jdata).success(function (response) {
            alert(response);
        }); 
        return true;
    }
}]);

var application = angular.module('applicationassetManagement', ['ngInputDate']);
application.controller('CalCtrl', ['$scope', function($scope) {
    $scope.dateBirth = new Date(2014, 3, 19);
}
]);
