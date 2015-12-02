(function() {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($rootScope) {
        var model = this;
        if ($rootScope.user) {
            model.loggedOn = true;
        } else {
            model.error = true;
            model.message = "Users list not found. Please log in or register.";
        }
    }
})();