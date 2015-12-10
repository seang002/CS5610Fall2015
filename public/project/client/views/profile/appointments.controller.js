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
        model.message = "Looks like you don't have any appointments at this time!"

        model.deleteAppt = deleteAppt;

        function init() {

        }

        function deleteAppt(index) {
            //var apptId = model.appts[index].id;
            console.log("Appointment deleted.");

        }
    }
})();