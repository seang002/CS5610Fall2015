(function() {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $rootScope) {
        var model = this;
        if ($rootScope.user) {
            model.user = $rootScope.user;
        } else {
            model.error = true;
            model.message = "User information not found. Please log in or register.";
        }

        model.update = update;

        function update(user) {
            UserService
                .updateUser(user.id, user)
                .then(function(users) {
                    if (!users) {
                        model.error = true;
                        model.message = "Username is already taken!";
                    } else {
                        console.log("Profile updated!");
                        for (var i in users) {
                            var user = users[i];
                            if (user.id == model.user.id) {
                                model.user = user;
                                break;
                            }
                        }
                        console.log(model.user);
                    }
                });
        }
    }
})();