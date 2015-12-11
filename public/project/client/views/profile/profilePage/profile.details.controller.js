(function() {
    "use strict";

    angular
        .module("DogWalkingApp")
        .controller("ProfileDetailsController", DetailsController);

    function DetailsController($scope, $rootScope, WalkerService, ngDialog) {
        var model = this;
        var id = $scope.ngDialogData.id;
        init();

        model.requestAppt = requestAppt;

        function init() {
            WalkerService
                .findUserById(id)
                .then(function(walker) {
                    model.walkerInfo = walker;
                    model.walkerInfo.days = model.walkerInfo.days.toString().replace(/,/g, ", ");
                    model.walkerInfo.times = model.walkerInfo.times.toString().replace(/,/g, ", ");
                });
        }

        function requestAppt(id) {
            if (!$rootScope.isUser) {
                ngDialog.open({
                    template: '<div class="alert alert-warning text-center">\
                                <i class="fa fa-exclamation-triangle fa-5x"></i><br\>\
                                    Oops! You need to log in first.\
                                </div>',
                    plain: true
                })
            } else {
                ngDialog.open({
                    template: './views/profile/appointments/appt.request.view.html',
                    controller: 'RequestController as model',
                    data: {id: id}
                })
            }
        }
    }
})();