(function() {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $scope, $rootScope, $location) {
        $scope.register = register;

        function register() {
            if ($scope.username == undefined || $scope.password == undefined
                    || $scope.email == undefined) {
                alert("Please fill out the missing fields.");
            } else if ($scope.password != $scope.vPassword) {
                alert("Passwords do not match.");
            } else {
                var newUser = {
                    username: $scope.username,
                    password: $scope.password,
                    email: $scope.email
                };
                console.log(newUser); //checking user object

                UserService.createUser(newUser, callback);

                console.log("New user created.");

                $rootScope.user = $scope.user;
                console.log($rootScope.user); //checking if rootScope.user is set

                $location.url('/profile');
            }
        }

        function callback(user) {
            $scope.user = user;
        }
    }
})();