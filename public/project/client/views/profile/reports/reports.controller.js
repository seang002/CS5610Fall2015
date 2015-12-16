(function() {
    "use strict";

    angular
        .module("DogWalkingApp")
        .controller("ReportController", ReportController);

    function ReportController($rootScope, $location, ReportService, $routeParams) {
        var model = this;
        if (!$rootScope.user) {
            $location.url("/home");
        } else {
            var id = $routeParams["id"];
            var type;
            if ($rootScope.isWalker) {
                type = "walker";
                model.canEdit = true;
            } else {
                type = "owner";
            }
            init();
        }

        model.deleteReport = deleteReport;
        model.selectReport = selectReport;
        model.updateReport = updateReport;

        function init() {
            ReportService
                .findAllUserReports(type, id)
                .then(function(reports) {
                    model.reports = reports;
                })
        }

        function deleteReport(index) {
            var reportId = model.reports[index]._id;
            var walkerId = model.reports[index].walkerId;
            var ownerId = model.reports[index].ownerId;
            ReportService
                .deleteReport(walkerId, ownerId, reportId)
                .then(function(reports) {
                    ReportService
                        .findAllUserReports(type, id)
                        .then(function(reports) {
                            model.reports = reports;
                        })
                });
        }

        function selectReport(index) {
            model.selectedReview = model.reports[index];
            model.timeWalked = model.reports[index].timedWalked;
            model.pooped = model.reports[index].pooped;
            model.peed = model.reports[index].peed;
            model.notes = model.reports[index].notes;
        }

        function updateReport(timeWalked, pooped, peed, notes) {
            var walkerId = model.selectedReview.walkerId;
            var ownerId = model.selectedReview.ownerId;
            var report = {timeWalked: timeWalked, pooped: pooped, peed: peed, notes: notes};
            ReportService
                .updateReport(walkerId, ownerId, report)
                .then(function(response) {
                    console.log("Updated report.");
                    ReportService
                        .findAllUserReports(type, id)
                        .then(function(reports) {
                            model.reports = reports;
                        })
                });
        }
    }
})();