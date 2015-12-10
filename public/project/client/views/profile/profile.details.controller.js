(function() {
    "use strict";

    angular
        .module("DogWalkingApp")
        .controller("ProfileDetailsController", DetailsController);

    function DetailsController($scope, $rootScope, WalkerService) {
        var model = this;
        var id = $scope.ngDialogData.id;
        init()

        model.requestAppt = requestAppt;

        function init() {
            WalkerService
                .findUserById(id)
                .then(function(walker) {
                    model.info = walker;
                    model.info.days = model.info.days.toString().replace(/,/g, ", ");
                    model.info.times = model.info.times.toString().replace(/,/g, ", ");
                });
        }

        function requestAppt() {
            if (!$rootScope.user) {
                alert("Please log in");
            }
        }
    }
})();