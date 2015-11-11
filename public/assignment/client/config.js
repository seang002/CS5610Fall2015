(function() {
    "use strict";

    angular
        .module("FormBuilderApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
            })
            .when("/login", {
                templateUrl: "views/login/login.view.html",
                controller: "LoginController"
            })
            .when("/register", {
                templateUrl: "views/register/register.view.html",
                controller: "RegisterController"
            })
            .when("/profile", {
                templateUrl: "views/profile/profile.view.html",
                controller: "ProfileController"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html"
            })
            .when("/form", {
                templateUrl: "views/form/form.view.html",
                controller: "FormController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();