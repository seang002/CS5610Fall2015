(function() {
    "use strict";

    angular
        .module("DogWalkingApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })
            .when("/appointments/:id", {
                templateUrl: "views/appointments/appointments.view.html",
                controller: "ApptController as model"
            })
            .when("/application", {
                templateUrl: "views/application/application.view.html",
                controller: "AppController as model"
            })
            .when("/profile/:id", {
                templateUrl: "views/profile/profile.view.html",
                controller: "ProfileController as model"
            })
            .when("/register", {
                templateUrl: "views/register/register.view.html",
                controller: "RegisterController as model"
            })
            .when("/thankyou", {
                templateUrl: "views/thankyou/thankyou.view.html"
            })
            .when("/walker", {
                templateUrl: "views/walker/walker.view.html",
                controller: "WalkerController as model"
            })
            .when("/walkers", {
                templateUrl: "views/walkers/walkers.view.html",
                controller: "WalkersController as model"
            })
            .otherwise({
                redirectTo: "/home"
            })
    }
})();