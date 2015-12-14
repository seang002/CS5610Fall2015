(function() {
    "use strict";

    angular
        .module("DogWalkingApp")
        .controller("LoginController", LoginController);

    function LoginController(OwnerService, WalkerService, $scope, $rootScope, $location) {
        var model = this;
        $scope.location = $location;

        model.login = login;

        function login() {
            var service;
            if (model.isWalker) {
                console.log("walker login");
                $rootScope.isWalker = true;
                service = WalkerService;
            } else {
                console.log("owner login");
                $rootScope.isWalker = false;
                service = OwnerService;
            }
            service
                .findUserByEmailAndPassword(model.email, model.password)
                .then(function(user) {
                    if (!user) {
                        model.error = true;
                        model.password = "";
                    } else {
                        model.error = false;
                        $rootScope.isUser = true;
                        $rootScope.user = user;
                        console.log($rootScope.user);

                        $location.url("/profile/" + $rootScope.user._id);
                    }
                });
        }
    }
})();