
    var app = angular.module('transferLicense', ['ngMessages']);

    app.controller('transferLicenseController', ['$http','Licenses' ,'$rootScope',function( $http,Licenses,$rootScope) {
        alert($rootScope.loggedUser);
        var model = this;

        model.message = "";

        model.transfer = {
            fromId: $rootScope.loggedUser,
            toId: "",
            assetId: ""
        };

        


       model.submit = function(isValid) {

            if (isValid) {

model.message = "Made some progress";
                var formData = {
                    'fromId' : this.transfer.fromId,
                    'toId' : this.transfer.toId,
                    'assetId' : this.transfer.assetId                    
                };
               // alert(this.transfer.fromId);
                model.transfer = {
                    fromId: "",
                    toId: "",
                    assetId: "" 
                    
                };
               var jdata = 'mydata='+JSON.stringify(formData);
               alert(jdata);
                Licenses.transfer(jdata).success(function(response){
                    alert(response);
                });
                return true;
            } else {
                model.message = "There are still invalid fields below";
            }
        };

}]);
    


    var compareTo = function() {

        return {

            require: "ngModel",
            scope: {
                otherModelValue: "=compareTo"
            },
            link: function(scope, element, attributes, ngModel) {

                ngModel.$validators.compareTo = function(modelValue) {
                    return modelValue == scope.otherModelValue;
                };

                scope.$watch("otherModelValue", function() {
                    ngModel.$validate();
                });
            }
        };
    };

    app.directive("compareTo", compareTo);

