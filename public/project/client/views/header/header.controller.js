(function() {
    "use strict";

    angular
        .module("DogWalkingApp")
        .controller("HeaderController", HeaderController);

    function HeaderController(OwnerService, WalkerService, $scope, $rootScope, $location, $timeout, ngDialog) {
        var model = this;
        $scope.$location = $location;

        model.login = login;
        model.logout = logout;
        model.confirmDelete = confirmDelete;
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
                    model.email = model.password = "";
                    if (!user) {
                        model.error = true;
                        $timeout(function() {
                            model.error = false;
                        }, 3000);
                    } else {
                        model.error = false;
                        $rootScope.isUser = true;
                        $rootScope.user = user;
                        console.log($rootScope.user);

                        $location.url("/profile/" + $rootScope.user._id);
                    }
                });
        }

        function logout() {
            delete $rootScope.user;
            $rootScope.isUser = $rootScope.isWalker = false;
            $location.url("/home");
        }

        function confirmDelete() {
            ngDialog.open({
                template: '<h4>Are you sure you want to delete this account?</h4>\
                <div class="ngdialog-buttons">\
                    <button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(1)">No</button>\
                    <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog(0); model.deleteAcct()">Yes</button>\
                </div>',
                plain: true,
                controller: 'HeaderController as model',
            });
        }

        function deleteAcct() {
            var service;
            if ($rootScope.isWalker) {
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