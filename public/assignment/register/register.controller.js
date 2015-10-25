(function() {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $scope, $rootScope, $location) {
        $scope.register = register;

        function register() {
            if ($scope.password != $scope.vPassword) {
                alert("Passwords do not match.");
            } else {
                var newUser = {
                    id: "",
                    username: $scope.username,
                    password: $scope.password,
                    firstName: "",
                    lastName: "",
                    email: $scope.email
                };
                console.log(newUser);

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