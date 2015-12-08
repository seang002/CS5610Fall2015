(function() {
    "use strict";

    angular
        .module("DogWalkingApp")
        .controller("WalkersController", WalkersController);

    function WalkersController(WalkerService) {
        var model = this;
        model.days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        model.times = ["6-9a", "9-12p", "12-3p", "3-6p"];
        model.freqs = ["Once", "Daily", "Weekly"];

        model.search = search;

        function search(criteria) {
            console.log("Searching...");
            console.log(criteria);
            model.walkers = [];
            if (model.walkers.length == 0) {
                model.hasNoResults = true;
            } else {
                model.hasResults = true;
            }
        }
    }
})();