(function() {
    "use strict";

    angular
        .module("DogWalkingApp")
        .controller("AppController", AppController);

    function AppController(WalkerService, $location) {
        var model = this;
        model.apply = apply;

        function apply(newWalker) {
            if (newWalker.password != newWalker.vPassword) {
                model.error = true;
                model.message = "Passwords do not match. Please re-enter.";
            } else {
                WalkerService
                    .createUser(newWalker)
                    .then(function(user) {
                        if (!user) {
                            model.error = true;
                            model.message = "Email is already taken; please choose another.";
                        } else {
                            console.log("Application was accepted.");
                            $location.url("/thankyou");
                        }
                    });
            }
        }
    }
})();