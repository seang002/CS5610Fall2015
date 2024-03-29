(function() {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $rootScope, $timeout) {
        var model = this;
        if ($rootScope.user) {
            model.user = $rootScope.user;
            model.loggedOn = true;
        } else {
            model.error = true;
            model.message = "User information not found. Please log in or register.";
        }

        model.update = update;

        function update(user) {
            UserService
                .updateUser(user._id, user)
                .then(function(users) {
                    if (!users) {
                        model.error = true;
                        model.message = "Username is already taken!";
                    } else {
                        console.log("Profile updated!");
                        model.success = true;
                        model.message = "Profile updated!";
                        $timeout(function() {
                            model.success = false;
                        }, 2500);
                        model.user = user;
                        console.log(model.user);
                    }
                });
        }
    }
})();