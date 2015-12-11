(function() {
    "use strict";

    angular
        .module("DogWalkingApp")
        .controller("ApptController", ApptController);

    function ApptController(ApptService, $rootScope, $location, ngDialog) {
        var model = this;
        if (!$rootScope.user) {
            $location.url("/home");
        } else {
            var user = $rootScope.user;
            var type;
            if ($rootScope.isWalker) {
                type = "walker";
            } else {
                type = "owner";
            }
            init();
        }
        model.appts = [];
        model.message = "Looks like you don't have any appointments at this time!";

        model.deleteAppt = deleteAppt;
        model.acceptAppt = acceptAppt;
        model.openProfile = openProfile;

        function init() {
            ApptService
                .findApptsByUserId(type, user._id)
                .then(function(appts) {
                    model.appts = appts;
                    if(model.appts.length > 0) {
                        model.hasAppts = true;
                    }
                });
        }

        function deleteAppt(index) {
            var apptId = model.appts[index]._id;
            ApptService
                .deleteApptById(apptId)
                .then(function(appts) {
                    ApptService
                        .findApptsByUserId(type, user._id)
                        .then(function(appts) {
                            console.log("Appointment deleted.");
                            model.appts = appts;
                            if (model.appts.length == 0) {
                                model.hasAppts = false;
                            }
                        })
                });
        }

        function acceptAppt(index, reply) {
            var apptId = model.appts[index]._id;
            model.appts[index].accepted = reply;
            ApptService
                .acceptApptById(apptId, model.appts[index])
                .then(function(appts) {
                    ApptService
                        .findApptsByUserId(type, user._id)
                        .then(function(appts) {
                            console.log("Appointment status updated.");
                            model.appts = appts;
                        })
                });
        }

        function openProfile(userId) {
            ngDialog.open({
                template: './views/profile/profile.details.view.html',
                controller: 'ProfileDetailController as model',
                data: {id: userId}
            })
        }
    }
})();