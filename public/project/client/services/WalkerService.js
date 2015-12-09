(function() {
    "use strict";

    angular
        .module("DogWalkingApp")
        .factory("WalkerService", WalkerService);

    function WalkerService($http, $q) {
        var service = {
            createUser: createUser,
            findAllUsers: findAllUsers,
            findUserByEmailAndPassword: findUserByEmailAndPassword,
            findUsersByParams: findUsersByParams,
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

        function findAllUsers() {
            var deferred = $q.defer();
            $http
                .get("/api/project/walker")
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

        function findUsersByParams(params) {
            var deferred = $q.defer();
            $http
                .get("/api/project/walker?day=" + params.day + "&time=" + params.time)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function updateUser(userId, user) {
            var deferred = $q.defer();
            $http
                .put("/api/project/walker/" + userId, user)
                .success(function(response) {
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