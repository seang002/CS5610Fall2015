(function() {
    "use strict";

    angular
        .module("DogWalkingApp")
        .controller("HeaderController", HeaderController);

    function HeaderController(OwnerService, WalkerService, $scope, $rootScope, $location, ngDialog) {
        var model = this;
        $scope.$location = $location;

        model.logout = logout;
        model.confirmDelete = confirmDelete;
        model.deleteAcct = deleteAcct;

        function logout() {
            delete $rootScope.user;
            $rootScope.isUser = $rootScope.isWalker = false;
            $location.url("/home");
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