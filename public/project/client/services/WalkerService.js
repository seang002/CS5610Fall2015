(function() {
    "use strict";

    angular
        .module("DogWalkingApp")
        .factory("WalkerService", WalkerService);

    function WalkerService($http, $q) {
        var service = {
            createUser: createUser,
            findUserByEmailAndPassword: findUserByEmailAndPassword,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUserById: deleteUserById
        };
        return service;

        function createUser(user) {
            var deferred = $q.defer();
            $http
                .post("/api/project/walker", user)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findUserByEmailAndPassword(email, password) {
            var deferred = $q.defer();
            $http
                .get("/api/project/walker?email=" + email + "&password=" + password)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findUserById(userId) {
            var deferred = $q.defer();
            $http
                .get("/api/project/walker/" + userId)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function updateUser(userId, user) {
            var deferred = $q.defer();
            $http
                .put("/api/project/walker/" + userId, user)
                .sucess(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteUserById(userId) {
            var deferred = $q.defer();
            $http
                .delete("/api/project/walker/" + userId)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();