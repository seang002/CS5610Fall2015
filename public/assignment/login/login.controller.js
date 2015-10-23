(function(){
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $scope, $rootScope) {
        $scope.login = function() {
            var user = UserService.findUserByUsernameAndPassword(
                $scope.username,
                $scope.password
            );

            if (user) {
                $rootScope.user = user;
                $scope.$location.url("/profile");
            }
        }
    }
})();