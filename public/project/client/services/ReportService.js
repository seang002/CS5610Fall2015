(function() {
    "use strict";

    angular
        .module("DogWalkingApp")
        .factory("ReportService", ReportService);

    function ReportService($http, $q) {
        var service = {
            findAllUserReports: findAllUserReports,
            createReport: createReport,
            deleteReport: deleteReport,
            updateReport: updateReport
        };
        return service;

        function findAllUserReports(userType, userId) {
            var deferred = $q.defer();
            $http
                .get("/api/project/" + userType + "/" + userId + "/report")
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function createReport(walkerId, ownerId, report) {
            var deferred = $q.defer();
            $http
                .post("/api/project/owner/" + ownerId + "/walker/" + walkerId + "/report", report)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteReport(walkerId, ownerId, reportId) {
            var deferred = $q.defer();
            $http
                .delete("/api/project/owner/" + ownerId + "/walker/" + walkerId + "/report/" + reportId)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function updateReport(walkerId, ownerId, report) {
            var deferred = $q.defer();
            $http
                .put("/api/project/owner/" + ownerId + "/walker/" + walkerId + "/report", report)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();