(function() {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $scope, $rootScope) {
        $scope.user = $rootScope.user;
        $scope.update = update;

        function update() {
            UserService.updateUser($scope.user.id, $scope.user)
                .then(function(users) {
                    console.log("Profile updated!");
                    for (var i in users) {
                        var user = users[i];
                        if (user.id == $scope.user.id) {
                            $scope.user = user;
                            break;
                        }
                    }
                    console.log($scope.user);
                });
        }
    }
})();