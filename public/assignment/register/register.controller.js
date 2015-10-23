(function() {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $scope, $rootScope) {
        $scope.register = function() {
            var user = $scope.user;
            if (user.password != user.vPassword) {
                alert("Passwords do not match.");
            } else {
                var newUser = {
                    username: $scope.username,
                    password: $scope.password,
                    firstName: "",
                    lastName: "",
                    email: $scope.email
                };

                var user = UserService.createUser(newUser);

                $rootScope.user = user;
                $scope.$location.url("/profile")
            }
        };
    }
})();