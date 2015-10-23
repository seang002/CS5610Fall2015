(function() {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $scope, $rootScope) {
        $scope.register = function() {
            var newUser = {
                username: $scope.username,
                password: $scope.password,
                email: $scope.email
            };

            var user = UserService.createUser(newUser);

            $rootScope.user = user;
            $scope.$location.url("/profile")
        };
    }
})();