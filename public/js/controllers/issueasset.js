/**
 * Created by Ishwarya on 14-10-2015.
 */
var licenseMgmtApp = angular.module('issueasset', []);

licenseMgmtApp.controller('issueLicenseCtrl', ['$scope','$rootScope','Licenses',function ($scope,$rootScope,Licenses) {
    $scope.myForm = {};
    $scope.myForm.software  = "";
    $scope.myForm.quantity = "";
    $scope.myForm.expirationDate = "";
    $scope.myForm.output="";
    $scope.myForm.key = "";
    $scope.myForm.companyName = "";
    $scope.myForm.version='';

    /*$scope.myForm.options = [
        { id : "Rational Application Developer", name: "Rational Application Developer" }
        ,{ id : "Parasoft", name: "Parasoft" }
        ,{ id : "Altova  XMLSpy"  , name: "Altova  XMLSpy" }
    ];*/
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
            'quantity': $scope.myForm.quantity,
            'expirationdate': $scope.myForm.expirationDate,
            'username': $rootScope.loggedUser,
            'key':$scope.myForm.key,
            'companyName':$scope.myForm.companyName,
            'version':$scope.myForm.version
        };
        $scope.myForm.software = "";
        $scope.myForm.quantity = '';
        $scope.myForm.expirationDate = '';
        $scope.myForm.key = "";
        $scope.myForm.companyName = "";
        $scope.myForm.version='';
        var jdata = 'mydata=' + JSON.stringify(formData);
        Licenses.issueLicense(jdata).success(function (response) {
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
