(function() {
    "use strict";

    angular
        .module("DogWalkingApp")
        .controller("AppController", AppController);

    function AppController(WalkerService, $location) {
        var model = this;
        model.apply = apply;

        function apply(newWalker) {
            console.log(newWalker);
            WalkerService
                .createUser(newWalker)
                .then(function(user) {
                    console.log("Application was accepted.");
                    $location.url("/thankyou");
                });
        }
    }
})();