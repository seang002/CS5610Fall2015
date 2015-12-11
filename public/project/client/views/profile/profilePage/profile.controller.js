(function() {
    "use strict";

    angular
        .module("DogWalkingApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(OwnerService, WalkerService, $rootScope, $location) {
        var model = this;
        if (!$rootScope.user) {
            $location.url("/home");
        }
        model.updateUser = updateUser;

        function updateUser(user) {
            var service;
            if ($rootScope.isWalker) {
                service = WalkerService;
            } else {
                service = OwnerService;
            }
            service
                .updateUser(user._id, user)
                .then(function(user) {
                    model.success = true;
                    console.log("Profile updated!");
                    console.log(user);
                })
        }
    }
})();