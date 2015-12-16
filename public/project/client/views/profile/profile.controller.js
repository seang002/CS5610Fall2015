(function() {
    "use strict";

    angular
        .module("DogWalkingApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(OwnerService, WalkerService, $rootScope, $location, $cookies) {
        var model = this;
        $rootScope.user = $cookies.getObject('loggeduser');
        $rootScope.isWalker = $cookies.get("walker");

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
                    $cookies.put("loggedin", user);
                    model.success = true;
                    console.log("Profile updated!");
                    console.log(user);
                })
        }
    }
})();