var app = angular.module('registration', ['ngMessages','loginService']);
app.controller('registrationController', ['$http','$window','loginServ' ,function( $http,$window,loginServ) {
    var model = this;
    model.message = "";
    model.user = {
            username: "",
            password: "",
            confirmPassword: "",
            location:"",
            department:""
        };
        model.submit = function(isValid) {
            if (isValid) {
                var formData = {
                    'username' : this.user.username,
                    'password' : this.user.password,
                    'location' : this.user.location,
                    'department' : this.user.department
                };
                model.user = {
                    username: "",
                    password: "",
                    confirmPassword: "",
                    location:"",
                    department:""
                };
               var jdata = 'mydata='+JSON.stringify(formData);
                loginServ.signUp(jdata).success(function(response){
                    alert(response);
                    $window.location.href = "/";
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