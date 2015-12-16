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
        model.openWalker = openWalker;
        model.openOwner = openOwner;
        model.openRequest = openRequest;
        model.sendReport = sendReport;

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

        function openWalker(userId) {
            ngDialog.open({
                template: './views/profile/profilePage/walker.profilePage.view.html',
                controller: 'ProfilePageController as model',
                data: {walkerId: userId}
            })
        }

        function openOwner(userId) {
            ngDialog.open({
                template: './views/profile/profilePage/owner.profilePage.view.html',
                controller: 'ProfilePageController as model',
                data: {ownerId: userId}
            })
        }

        function openRequest(appt) {
            ngDialog.open({
                template: './views/profile/appointments/appt.details.html',
                controller: 'RequestController as model',
                data: {appt: appt}
            })
        }

        function sendReport(ownerId, walkerId) {
            ngDialog.open({
                template: './views/profile/reports/sendReport.view.html',
                controller: 'sendReportController as model',
                data: {walkerId: walkerId, ownerId: ownerId}
            })
        }
    }
})();