(function() {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $rootScope) {
        var model = this;
        model.user = $rootScope.user;
        model.update = update;

        function update(user) {
            UserService.updateUser(user.id, user)
                .then(function(users) {
                    console.log("Profile updated!");
                    for (var i in users) {
                        var user = users[i];
                        if (user.id == model.user.id) {
                            model.user = user;
                            break;
                        }
                    }
                    console.log(model.user);
                });
        }
    }
})();