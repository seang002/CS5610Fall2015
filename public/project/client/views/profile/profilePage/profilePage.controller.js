(function() {
    "use strict";

    angular
        .module("DogWalkingApp")
        .controller("ProfilePageController", ProfilePageController);

    function ProfilePageController($scope, OwnerService, WalkerService) {
        var model = this;
        var ownerId = $scope.ngDialogData.ownerId;
        var walkerId = $scope.ngDialogData.walkerId;
        model.walkerInfo = model.ownerId = "";
        init();

        function init() {
            if (ownerId) {
                OwnerService
                    .findUserById(ownerId)
                    .then(function(owner) {
                        model.ownerInfo = owner;
                    });
            }
            if (walkerId) {
                WalkerService
                    .findUserById(walkerId)
                    .then(function(walker) {
                        model.walkerInfo = walker;
                        model.walkerInfo.days = model.walkerInfo.days.toString().replace(/,/g, ", ");
                        model.walkerInfo.times = model.walkerInfo.times.toString().replace(/,/g, ", ");
                    });
            }
        }
    }
})();