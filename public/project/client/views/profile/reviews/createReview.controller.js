(function() {
    angular
        .module("DogWalkingApp")
        .controller("createReviewController", createReviewController);

    function createReviewController($scope, $rootScope, WalkerService, ReviewService) {
        var model = this;
        var walkerId = $scope.ngDialogData.walkerId;
        init();

        model.createReview = createReview;
        model.editReview = editReview;

        function init() {
            WalkerService
                .findUserById(walkerId)
                .then(function(walker) {
                    model.walker = walker;
                });

            for (var i in $rootScope.user.reviews) {
                if ($rootScope.user.reviews[i].walkerId.indexOf(walkerId) > -1) {
                    model.oldReview = true;
                    model.olderReview = $rootScope.user.reviews[i];
                }
            }
        }

        function createReview(review, owner) {
            review.ownerId = owner._id;
            review.dogName = owner.dogName;
            review.walkerId = walkerId;
            review.walker = model.walker.firstName;
            ReviewService
                .createReview(walkerId, owner._id, review)
                .then(function(response) {
                    console.log("Created review.");
                });
        }

        function editReview(review, owner) {
            review.ownerId = owner._id;
            review.dogName = owner.dogName;
            review.walkerId = walkerId;
            review.walker = model.walker.firstName;
            ReviewService
                .updateReview(walkerId, owner._id, review)
                .then(function(response) {
                    console.log("Updated review.");
                });
        }
    }
})();