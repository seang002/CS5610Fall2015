(function() {
    angular
        .module("DogWalkingApp")
        .controller("RequestController", RequestController);

    function RequestController($scope, WalkerService, ApptService) {
        var model = this;
        var id = $scope.ngDialogData.id;
        init();

        model.times = ["6-9a", "9-12p", "12-3p", "3-6p"];
        model.freqs = ["Once", "Daily", "Weekly"];
        model.days = ["N/A", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        model.sizes = ["Small", "Medium", "Large"];

        model.createAppt = createAppt;

        function init() {
            WalkerService
                .findUserById(id)
                .then(function(walker) {
                    model.walker = walker;
                });
        }

        function createAppt(appt, owner) {
            model.success = true;
            appt.ownerId = owner._id;
            appt.dogName = owner.dogName
            appt.walkerId = model.walker._id;
            appt.walker = model.walker.firstName;
            ApptService
                .createAppt(appt)
                .then(function(status) {
                    console.log(status);
                })
        }

        function updateAppt(appt) {

        }
    }
})();