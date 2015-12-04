(function() {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController(UserService, $rootScope) {
        var model = this;
        if ($rootScope.user && $rootScope.user.roles.indexOf('admin') > -1) {
            model.loggedOn = true;
            init();
        } else {
            model.error = true;
            model.message = "Sorry, looks like you don't have the credentials to access this page.";
        }

        model.deleteUser = deleteUser;

        function init() {
            UserService
                .findAllUsers()
                .then(function(users) {
                    for (var i in users) {
                        var user = users[i];
                        var readableRoles = "" + user.roles[0];
                        if (user.roles.length > 1) {
                            for (var j = 1; j < user.roles.length; j++) {
                                readableRoles += " | " + user.roles[j];
                            }
                        }
                        user.roles = readableRoles;
                    }
                    model.users = users;
                })
        }

        function deleteUser(index) {
            var userId = model.users[index]._id;
            UserService
                .deleteUserById(userId)
                .then(function(users) {
                    init()
                })
        }
    }
})();