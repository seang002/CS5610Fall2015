(function(){
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $rootScope, $location) {
        var model = this;
        model.login = login;

        function login(username, password) {
            UserService
                .findUserByUsernameAndPassword(username, password)
                .then(function(user) {
                    if (!user) {
                        alert("Username and/or password is not correct.");
                    } else {
                        $rootScope.user = user;
                        console.log("rootScope user:"); //checking if rootScope.usr is set
                        console.log($rootScope.user);

                        $location.url('/profile');
                    }
                });
        }
    }
})();