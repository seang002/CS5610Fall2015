(function() {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $rootScope, $location) {
        var model = this;
        model.register = register;

        function register(user) {
            if (user.username == undefined || user.password == undefined) {
                alert("Please fill out the missing fields.");
            } else if (user.password != user.vPassword) {
                alert("Passwords do not match.");
            } else {
                var newUser = {username: user.username, password: user.password, email: user.email};

                UserService
                    .createUser(newUser)
                    .then(function(users) {
                        if (!users) {
                            alert("Username already exists. Please choose another.")
                        } else {
                            console.log("New user created.");
                            for (var i in users) {
                                var user = users[i];
                                if (user.username == newUser.username && user.password == newUser.password) {
                                    $rootScope.user = user;
                                    $location.url('/profile');
                                }
                            }
                        }
                    });
            }
        }
    }
})();