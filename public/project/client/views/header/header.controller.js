(function() {
    "use strict";

    angular
        .module("DogWalkingApp")
        .controller("HeaderController", HeaderController);

    function HeaderController(OwnerService, WalkerService, $scope, $rootScope, $location) {
        var model = this;
        $scope.$location = $location;

        model.login = login;
        model.logout = logout;
        model.deleteAcct = deleteAcct;

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
                    } else {
                        $rootScope.isUser = true;
                        $rootScope.user = user;
                        console.log("rootScope user:");
                        console.log($rootScope.user);

                        $location.url("/profile/" + $rootScope.user._id);
                    }
                });
        }

        function logout() {
            delete $rootScope.user;
            model.email = model.password = "";
            $rootScope.isUser = model.isWalker = model.error = false;
            $location.url("/home");
        }

        function deleteAcct() {
            var service;
            if (model.isWalker) {
                console.log("walker delete");
                service = WalkerService;
            } else {
                console.log("owner delete");
                service = OwnerService;
            }

            service
                .deleteUserById($rootScope.user._id)
                .then(function(response) {
                    console.log(response);
                    console.log("User account deleted.");
                    logout();
                });
        }
    }
})();