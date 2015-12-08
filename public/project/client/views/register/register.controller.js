(function() {
    "use strict";

    angular
        .module("DogWalkingApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $rootScope, $location) {
        var model = this;
        model.register = register;
        model.apply = apply;

        function register(user) {
            if (user.password != user.vPassword) {
                model.error = true;
                model.message = "Passwords do not match. Please re-enter.";
            } else {
                var newUser = {email: user.email, password: user.password,
                    dogName: user.dogName, breed: user.breed, age: user.age
                };

                UserService
                    .createUser(newUser)
                    .then(function(user) {
                        if (!user) {
                            model.error = true;
                            model.message = "Email is already taken; please choose another.";
                        } else {
                            console.log("New user created.");
                            $rootScope.user = user;
                            $location.url("/profile");
                        }
                    });
            }
        }

        function apply() {
            $location.url("/application");
        }
    }
})();