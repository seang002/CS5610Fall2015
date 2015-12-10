(function() {
    "use strict";

    angular
        .module("DogWalkingApp")
        .controller("WalkersController", WalkersController);

    function WalkersController(WalkerService, ngDialog) {
        var model = this;
        model.days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        model.times = ["6-9a", "9-12p", "12-3p", "3-6p"];
        model.freqs = ["Once", "Daily", "Weekly"];

        model.search = search;
        model.searchAll = searchAll;
        model.moreInfo = moreInfo;
        model.walkers = [];

        function search(criteria) {
            model.hasResults = false;
            model.hasNoResults = false;
            console.log("Searching...");
            console.log(criteria);
            WalkerService
                .findUsersByParams(criteria)
                .then(function(walkers) {
                    model.walkers = walkers;
                    if (model.walkers.length == 0) {
                        model.hasNoResults = true;
                    } else {
                        model.hasResults = true;
                    }
                });
        }

        function searchAll() {
            model.hasResults = false;
            model.hasNoResults = false;
            WalkerService
                .findAllUsers()
                .then(function(walkers) {
                    model.walkers = walkers;
                    if (model.walkers.length > 0) {
                        model.hasResults = true;
                    }
                });
        }

        function moreInfo(id) {
            ngDialog.open({
                template: './views/profile/profile.details.view.html',
                controller: 'ProfileDetailsController',
                controllerAs: 'model',
                data: {id: id}
            })
        }
    }
})();