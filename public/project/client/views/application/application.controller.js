(function() {
    "use strict";

    angular
        .module("DogWalkingApp")
        .controller("AppController", AppController);

    function AppController(UserService, $location) {
        var model = this;
        model.apply = apply;

        function apply(newWalker) {
            UserService
                .createUser(newWalker)
                .then(function(user) {
                    console.log("Application was accepted.");
                    $location.url("/thankyou");
                });
        }
    }
})();