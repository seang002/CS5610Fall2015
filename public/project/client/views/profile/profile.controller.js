(function() {
    "use strict";

    angular
        .module("DogWalkingApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(OwnerService, WalkerService, $rootScope, $location) {
        var model = this;
        if ($rootScope.user) {
            init();
        } else {
            $location.url("/home");
        }
        model.updateUser = updateUser;

        function init() {
            model.isWalker = $rootScope.isWalker;
            model.isOwner = !model.isWalker;
        }

        function updateUser(user) {
            var service;
            if (model.isWalker) {
                service = WalkerService;
            } else {
                service = OwnerService;
            }
            service
                .updateUser(user._id, user)
                .then(function(user) {
                    console.log("Profile updated!");
                    console.log(user);
                })
        }
    }
})();