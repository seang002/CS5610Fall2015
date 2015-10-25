(function(){
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $scope, $rootScope, $location) {
        $scope.login = login;

        function login() {
            UserService.findUserByUsernameAndPassword(
                $scope.username,
                $scope.password,
                callback
            );
            console.log($scope.user);

            if ($scope.user != null) {
                $rootScope.user = $scope.user;
                console.log("rootScope user:"); //checking if rootScope.usr is set
                console.log($rootScope.user);

                $location.url('/profile');
            } else {
                alert("Username and/or password is not correct.");
            }
        }

        function callback(user) {
            $scope.user = user;
        }
    }
})();