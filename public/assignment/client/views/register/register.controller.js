(function() {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $rootScope, $location) {
        var model = this;
        model.register = register;

        function register(user) {
            if (user.password != user.vPassword) {
                model.error = true;
                model.message = "Passwords do not match. Please re-enter.";
            } else {
                var newUser = {username: user.username, password: user.password, email: user.email};

                UserService
                    .createUser(newUser)
                    .then(function(user) {
                        if (!user) {
                            model.error = true;
                            model.message = "Username is already taken!";
                        } else {
                            console.log("New user created.");
                            $rootScope.user = user;
                            $location.url('/profile');
                        }
                    });
            }
        }
    }
})();