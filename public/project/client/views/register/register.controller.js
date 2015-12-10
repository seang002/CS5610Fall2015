(function() {
    "use strict";

    angular
        .module("DogWalkingApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(OwnerService, $location) {
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

                OwnerService
                    .createUser(newUser)
                    .then(function(user) {
                        if (!user) {
                            model.error = true;
                            model.message = "Email is already taken; please choose another.";
                        } else {
                            console.log("New user created.");
                            model.error = false;
                            model.success = true;
                            model.message = "Registration successful! Feel free to log in any time.";
                        }
                    });
            }
        }

        function apply() {
            $location.url("/application");
        }
    }
})();