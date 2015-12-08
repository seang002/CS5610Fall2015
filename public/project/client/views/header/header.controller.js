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
                service = WalkerService;
            } else {
                console.log("owner login");
                service = OwnerService;
            }
            service
                .findUserByEmailAndPassword(model.email, model.password)
                .then(function(user) {
                    if (!user) {
                        model.error = true;
                    } else {
                        model.isUser = true;
                        $rootScope.user = model.user = user;
                        console.log("rootScope user:");
                        console.log($rootScope.user);

                        $location.url("/profile/" + $rootScope.user._id);
                    }
                });
        }

        function logout() {
            delete $rootScope.user;
            model.email = model.password = "";
            model.isUser = model.error = model.isWalker = false;
            $location.url("/home");
        }

        function deleteAcct() {
            var service;
            if (model.isWalker) {
                service = WalkerService;
            } else {
                service = OwnerService;
            }
            service
                .deleteUserById($rootScope.user._id)
                .then(function(response) {
                    logout();
                });
        }
    }
})();