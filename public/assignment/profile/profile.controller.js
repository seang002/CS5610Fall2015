(function() {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $scope, $rootScope) {
        var user = $rootScope.user;
        $scope.user = user;

        $scope.update = function() {
            UserService.updateUser(user.id, user);
        }
    }
})();