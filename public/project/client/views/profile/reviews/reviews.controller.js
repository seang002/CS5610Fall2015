(function() {
    "use strict";

    angular
        .module("DogWalkingApp")
        .controller("ReviewController", ReviewController);

    function ReviewController($rootScope, $location, ReviewService, $routeParams, $cookies) {
        var model = this;
        $rootScope.user = $cookies.getObject('loggeduser');
        $rootScope.isWalker = $cookies.get("walker");

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
        model.selectReview = selectReview;
        model.updateReview = updateReview;

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

        function selectReview(index) {
            model.selectedReview = model.reviews[index];
            model.rating = model.reviews[index].rating;
            model.note = model.reviews[index].note;
        }

        function updateReview(rating, note) {
            var walkerId = model.selectedReview.walkerId;
            var ownerId = model.selectedReview.ownerId;
            var review = {rating: rating, note: note};
            ReviewService
                .updateReview(walkerId, ownerId, review)
                .then(function(response) {
                    console.log("Updated review.");
                    ReviewService
                        .findAllUserReviews(type, id)
                        .then(function(reviews) {
                            model.reviews = reviews;
                        })
                });
        }
    }
})();