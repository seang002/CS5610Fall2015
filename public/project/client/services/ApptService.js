(function() {
    "use strict";

    angular
        .module("DogWalkingApp")
        .factory("ApptService", ApptService);

    function ApptService($http, $q) {
        var service = {
            createAppt: createAppt,
            findApptsByUserId: findApptsByUserId,
            deleteApptById: deleteApptById,
            acceptApptById: acceptApptById
        };
        return service;

        function createAppt(appt) {
            var deferred = $q.defer();
            $http
                .post("/api/project/appt", appt)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findApptsByUserId(userType, userId) {
            var deferred = $q.defer();
            $http
                .get("/api/project/" + userType + "/" + userId + "/appt")
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteApptById(apptId) {
            var deferred = $q.defer();
            $http
                .delete("/api/project/appt/" + apptId)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function acceptApptById(apptId, appt) {
            var deferred = $q.defer();
            $http
                .put("/api/project/appt/" + apptId, appt)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();