(function() {
    "use strict";

    angular
        .module("DogWalkingApp")
        .controller("ApptController", ApptController);

    function ApptController() {
        var model = this;
        init();

        model.deleteAppt = deleteAppt;

        function init() {
            model.appts = [
                {dogName: "Kibbles", walker: "Jane", date: "12/11/15", time: "6a", freq: "Daily", size: "Small"}
            ];
            if (model.appts.length > 0) {
                model.hasAppts = true;
            }
        }

        function deleteAppt(index) {
            //var apptId = model.appts[index].id;
            console.log("Appointment deleted.");

        }
    }
})();