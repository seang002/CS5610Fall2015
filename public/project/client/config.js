(function() {
    "use strict";

    angular
        .module("DogWalkingApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "home/home.view.html"
            })
            .when("/register", {
                templateUrl: "register/register.view.html"
            })
            .when("/application", {
                templateUrl: "application/application.view.html"
            })
            .when("/thankyou", {
                templateUrl: "thankyou/thankyou.view.html"
            })
            .when("/profile", {
                templateUrl: "profile/profile.view.html"
            })
            .when("/walker", {
                templateUrl: "profile/walker.view.html"
            })
            .when("/walkers", {
                templateUrl: "walkers/walkers.view.html"
            })
            .when("/appointments", {
                templateUrl: "appointments/appointments.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            })
    }
})();