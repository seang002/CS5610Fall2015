(function() {
    angular
        .module("DogWalkingApp")
        .controller("sendReportController", sendReportController);

    function sendReportController($scope, WalkerService, OwnerService, ReportService) {
        var model = this;
        var walkerId = $scope.ngDialogData.walkerId;
        var ownerId = $scope.ngDialogData.ownerId;
        init();

        model.createReport = createReport;
        model.editReport = editReport;

        function init() {
            WalkerService
                .findUserById(walkerId)
                .then(function(walker) {
                    model.walker = walker;
                });
            OwnerService
                .findUserById(ownerId)
                .then(function(owner) {
                    model.owner = owner;
                })
        }

        function createReport(report) {
            report.ownerId = ownerId;
            report.dogName = model.owner.dogName;
            report.walkerId = walkerId;
            report.walker = model.walker.firstName;
            ReportService
                .createReport(walkerId, ownerId, report)
                .then(function(response) {
                    console.log("Created report.");
                });
        }

        function editReport(report) {
            report.ownerId = ownerId
            report.dogName = model.owner.dogName;
            report.walkerId = walkerId;
            report.walker = model.walker.firstName;
            ReportService
                .updateReport(walkerId, owner._id, review)
                .then(function(response) {
                    console.log("Updated report.");
                });
        }
    }
})();