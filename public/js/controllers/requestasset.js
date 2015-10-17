/**
 * Created by Ishwarya on 14-10-2015.
 */
var licenseMgmtApp = angular.module('requestasset', []);

licenseMgmtApp.controller('requestLicenseCtrl', ['$scope','$rootScope','Licenses',function ($scope,$rootScope,Licenses) {
    $scope.myForm = {};
    $scope.myForm.software  = "";
    $scope.myForm.requestEndDate = "";
    $scope.myForm.output="";

    $scope.myForm.options = [
        { id : "Rational Application Developer", name: "Rational Application Developer" }
        ,{ id : "Parasoft", name: "Parasoft" }
        ,{ id : "Altova  XMLSpy"  , name: "Altova  XMLSpy" }
    ];
    //console.log('HERE');
   // console.log('$scope.myForm.software');
    // Preparing the Json Data from the Angular Model to send in the Server.
    $scope.submit=function() {
        var formData = {
            'software': $scope.myForm.software,
            'requestEndDate': $scope.myForm.requestEndDate,
            'username': $rootScope.loggedUser,
            'status':'pending',
            'id': (new Date).getTime()
        };
        $scope.myForm.software = "";
        $scope.myForm.requestEndDate = '';
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
