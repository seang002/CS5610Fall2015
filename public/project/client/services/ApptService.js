(function() {
    "use strict";

    angular
        .module("DogWalkingApp")
        .factory("ApptService", ApptService);

    function ApptService($http, $q) {
        var service = {
            createAppt: createAppt
        };
        return service;

        function createAppt(appt) {
            var deferred = $q.defer();
            $http
                .post("api/project/walker/appt", appt)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();