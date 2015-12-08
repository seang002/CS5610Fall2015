(function() {
    "use strict";

    angular
        .module("DogWalkingApp")
        .factory("UserService", UserService);

    function UserService($http, $q) {
        var service = {
            createUser: createUser,
            findUserByEmailAndPassword: findUserByEmailAndPassword,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUserById: deleteUserById
        };
        return service;

        function createUser(newUser) {
            var deferred = $q.defer();
            $http
                .post("/api/project/user", newUser)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findUserByEmailAndPassword(email, password) {
            var deferred = $q.defer();
            $http
                .get("/api/project/user?email=" + email + "&password=" + password)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findUserById(userId) {
            var deferred = $q.defer();
            $http
                .get("/api/project/user/" + userId)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function updateUser(userId, user) {
            var deferred = $q.defer();
            $http
                .put("/api/project/user/" + userId, user)
                .sucess(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteUserById(userId) {
            var deferred = $q.defer();
            $http
                .delete("/api/project/user/" + userId)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();