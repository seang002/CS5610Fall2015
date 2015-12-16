(function() {
    "use strict";

    angular
        .module("DogWalkingApp")
        .controller("ReviewController", ReviewController);

    function ReviewController($rootScope, $location, ReviewService, $routeParams) {
        var model = this;
        if (!$rootScope.user) {
            $location.url("/home");
        } else {
            var id = $routeParams["id"];
            var type;
            if ($rootScope.isWalker) {
                type = "walker";
            } else {
                type = "owner";
                model.canEdit = true;
            }
            init();
        }
        model.deleteReview = deleteReview;

        function init() {
            ReviewService
                .findAllUserReviews(type, id)
                .then(function(reviews) {
                    model.reviews = reviews;
                })

        }

        function deleteReview(index) {
            var reviewId = model.reviews[index]._id;
            var walkerId = model.reviews[index].walkerId;
            var ownerId = model.reviews[index].ownerId;
            ReviewService
                .deleteReview(walkerId, ownerId, reviewId)
                .then(function(reviews) {
                    ReviewService
                        .findAllUserReviews(type, id)
                        .then(function(reviews) {
                            model.reviews = reviews;
                        })
                });
        }
    }
})();