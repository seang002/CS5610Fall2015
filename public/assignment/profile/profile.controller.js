(function() {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $scope, $rootScope) {
        $scope.user = $rootScope.user;
        console.log("Before:");
        console.log($scope.user); //to check userObj before update

        $scope.update = update;

        function update() {
            UserService.updateUser(
                $scope.user.id,
                $scope.user,
                callback
            );
            console.log("Profile updated!");

            console.log("After:")
            console.log($scope.user); //to check userObj after update
        }

        function callback(user) {
            $scope.user = user;
        }
    }
})();