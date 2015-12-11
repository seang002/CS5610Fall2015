(function() {
    "use strict";

    angular
        .module("DogWalkingApp")
        .controller("ReportController", ReportController);

    function ReportController($rootScope, $location) {
        var model = this;
        if (!$rootScope.user) {
            $location.url("/home");
        } else {
            init();
        }

        function init() {

        }
    }
})();