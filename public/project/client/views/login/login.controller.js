(function() {
    "use strict";

    angular
        .module("DogWalkingApp")
        .controller("LoginController", LoginController);

    function LoginController(OwnerService, WalkerService, $scope, $rootScope, $location, $cookies) {
        var model = this;
        $scope.location = $location;

        model.ownerLogin = ownerLogin;
        model.walkerLogin = walkerLogin;

        function ownerLogin(user) {
            console.log("owner login");
            $rootScope.isWalker = false;
            OwnerService
                .findUserByEmailAndPassword(user.email, user.password)
                .then(function(user) {
                    if (!user) {
                        model.errorO = true;
                    } else {
                        model.errorO = false;
                        $rootScope.isUser = true;
                        $rootScope.user = user;
                        console.log($rootScope.user);

                        $location.url("/walkers");
                        $cookies.putObject("loggeduser", user);
                        $cookies.put("loggedin", true);
                    }
                });
        }

        function walkerLogin(user) {
            console.log("walker login");
            $rootScope.isWalker = true;
            WalkerService
                .findUserByEmailAndPassword(user.email, user.password)
                .then(function(user) {
                    if (!user) {
                        model.errorW = true;
                    } else {
                        model.errorW = false;
                        $rootScope.isUser = true;
                        $rootScope.user = user;
                        console.log($rootScope.user);

                        $location.url("/profile/" + $rootScope.user._id);
                        $cookies.putObject("loggeduser", user);
                        $cookies.put("loggedin", true);
                        $cookies.put("walker", true);
                    }
                });
        }
    }
})();