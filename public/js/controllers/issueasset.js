/**
 * Created by Ishwarya on 14-10-2015.
 */
var licenseMgmtApp = angular.module('issueasset', []);

licenseMgmtApp.controller('issueLicenseCtrl', ['$scope','Licenses',function ($scope,Licenses) {
    $scope.myForm = {};
    $scope.myForm.software  = "";
    $scope.myForm.quantity = "";
    $scope.myForm.expirationDate = "";
    $scope.myForm.output="";

    $scope.myForm.options = [
        { id : "rad", name: "Rational Application Developer" }
        ,{ id : "parasoft", name: "Parasoft" }
        ,{ id : "altovaXMLSpy"  , name: "Altova  XMLSpy" }
    ];
    // Preparing the Json Data from the Angular Model to send in the Server.
    $scope.submit=function() {
        var formData = {
            'software': $scope.myForm.software,
            'quantity': $scope.myForm.quantity,
            'expirationdate': $scope.myForm.expirationDate,
            'username': 'test'
        };
        $scope.myForm.software = "";
        $scope.myForm.quantity = '';
        $scope.myForm.expirationDate = '';
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
