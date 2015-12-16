(function() {
    "use strict";

    angular
        .module("DogWalkingApp")
        .controller("HeaderController", HeaderController);

    function HeaderController(OwnerService, WalkerService, ApptService, $scope, $rootScope, $location, ngDialog, $cookies) {
        var model = this;
        $scope.$location = $location;
        $rootScope.user = $cookies.getObject('loggeduser');
        $rootScope.isUser = $cookies.get('loggedin');
        $rootScope.isWalker = $cookies.get("walker");

        model.logout = logout;
        model.confirmDelete = confirmDelete;
        model.deleteAcct = deleteAcct;

        function logout() {
            delete $rootScope.user;
            $rootScope.isUser = $rootScope.isWalker = false;
            $location.url("/home");
            $cookies.remove("loggedin");
            $cookies.remove("loggeduser");
            $cookies.remove("walker");
        }

        function confirmDelete() {
            ngDialog.open({
                template: '<h4>Are you sure you want to delete this account?</h4>\
                <div class="ngdialog-buttons">\
                    <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog(1)">No</button>\
                    <button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0); model.deleteAcct()">Yes</button>\
                </div>',
                plain: true,
                controller: 'HeaderController as model'
            });
        }

        function deleteAcct() {
            var service;
            var userType;
            if ($rootScope.isWalker) {
                console.log("walker delete");
                service = WalkerService;
                userType = "walker";
            } else {
                console.log("owner delete");
                service = OwnerService;
                userType = "owner";
            }

            service
                .deleteUserById($rootScope.user._id)
                .then(function(response) {
                    console.log(response);
                    console.log("User account deleted.");

                    // delete user appts
                    if (userType == "walker") {
                        ApptService
                            .deleteApptByWalkerId($rootScope.user._id)
                            .then(function(response) {
                                console.log(response);
                            });
                    } else {
                        ApptService
                            .deleteApptByOwnerId($rootScope.user._id)
                            .then(function(response) {
                                console.log(response);
                            });
                    }
                    logout();
                });
        }
    }
})();