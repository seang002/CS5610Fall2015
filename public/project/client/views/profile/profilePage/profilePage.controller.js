(function() {
    "use strict";

    angular
        .module("DogWalkingApp")
        .controller("ProfilePageController", ProfilePageController);

    function ProfilePageController($scope, OwnerService, WalkerService, $location) {
        var model = this;
        var ownerId = $scope.ngDialogData.ownerId;
        var walkerId = $scope.ngDialogData.walkerId;
        model.walkerInfo = model.ownerId = "";
        init();

        model.toReviews = toReviews;

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
                        var totalRatings = 0;
                        for (var i in model.walkerInfo.reviews) {
                            totalRatings += model.walkerInfo.reviews[i].rating;
                        }
                        model.walkerInfo.rating = totalRatings / model.walkerInfo.reviews.length;
                        if (!model.walkerInfo.rating) {
                            model.walkerInfo.rating = 0;
                        }
                    });
            }
        }

        function toReviews() {
            $location.url("/profile/" + model.walkerInfo._id + "/reviews");
        }
    }
})();