(function() {
    "use strict";

    angular
        .module("DogWalkingApp")
        .controller("HeaderController", HeaderController);

    function HeaderController(UserService, $scope, $rootScope, $location) {
        $scope.$location = $location;
        $scope.login = login;
        $scope.logout = logout;
        $scope.deleteAcct = deleteAcct;

        function login(email, password) {
            UserService
                .findUserByEmailAndPassword(email, password)
                .then(function(user) {
                    if (!user) {
                        $scope.error = true;
                    } else {
                        $scope.isUser = true;
                        $rootScope.user = $scope.user = user;
                        console.log("rootScope user:");
                        console.log($rootScope.user);

                        $location.url("/profile");
                    }
                })
        }

        function logout() {
            delete $rootScope.user;
            $scope.email = $scope.password = "";
            $scope.isUser = false;
            $scope.error = false;
            $location.url("/home");
        }

        function deleteAcct() {
            UserService
                .deleteUserById($rootScope.user.id)
                .then(function(response) {
                    logout();
                })
        }
    }
})();