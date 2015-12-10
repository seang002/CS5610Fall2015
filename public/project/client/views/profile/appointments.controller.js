(function() {
    "use strict";

    angular
        .module("DogWalkingApp")
        .controller("ApptController", ApptController);

    function ApptController($rootScope, $location) {
        var model = this;
        if (!$rootScope.user) {
            $location.url("/home");
        } else {
            init();
        }

        model.deleteAppt = deleteAppt;

        function init() {

        }

        function deleteAppt(index) {
            //var apptId = model.appts[index].id;
            console.log("Appointment deleted.");

        }
    }
})();