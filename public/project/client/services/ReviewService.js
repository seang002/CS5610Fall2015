(function() {
    "use strict";

    angular
        .module("DogWalkingApp")
        .factory("ReviewService", ReviewService);

    function ReviewService($http, $q) {
        var service = {
            findAllUserReviews: findAllUserReviews,
            createReview: createReview,
            deleteReview: deleteReview,
            updateReview: updateReview
        };
        return service;

        function findAllUserReviews(userType, userId) {
            var deferred = $q.defer();
            $http
                .get("/api/project/" + userType + "/" + userId + "/review")
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function createReview(walkerId, ownerId, review) {
            var deferred = $q.defer();
            $http
                .post("/api/project/owner/" + ownerId + "/walker/" + walkerId + "/review", review)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteReview(walkerId, ownerId, reviewId) {
            var deferred = $q.defer();
            $http
                .delete("/api/project/owner/" + ownerId + "/walker/" + walkerId + "/review/" + reviewId)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function updateReview(walkerId, ownerId, review) {
            var deferred = $q.defer();
            $http
                .put("/api/project/owner/" + ownerId + "/walker/" + walkerId + "/review", review)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();