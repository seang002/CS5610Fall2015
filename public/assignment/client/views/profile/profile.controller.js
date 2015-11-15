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
            alert("User information not found. Log in first!");
        }

        model.update = update;

        function update(user) {
            UserService
                .updateUser(user.id, user)
                .then(function(users) {
                    if (!users) {
                        alert("Username already exists. Please choose another.")
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