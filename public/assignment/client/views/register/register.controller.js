(function() {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $scope, $rootScope, $location) {
        $scope.register = register;

        function register() {
            if ($scope.username == undefined || $scope.password == undefined
                    || $scope.email == undefined) {
                alert("Please fill out the missing fields.");
            } else if ($scope.password != $scope.vPassword) {
                alert("Passwords do not match.");
            } else {
                var newUser = {username: $scope.username, password: $scope.password, email: $scope.email};

                UserService.createUser(newUser)
                    .then(function(users) {
                        console.log("New user created.");
                        for (var i in users) {
                            var user = users[i];
                            if (user.username == newUser.username && user.password == newUser.password) {
                                $rootScope.user = user;
                                $location.url('/profile');
                            }
                        }
                    });
            }
        }
    }
})();