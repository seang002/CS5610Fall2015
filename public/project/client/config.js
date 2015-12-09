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
            .when("/profile/:id/appointments", {
                templateUrl: "views/profile/appointments.view.html",
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
            .when("/profile/:id/reviews", {
                templateUrl: "views/profile/reviews.view.html",
                controller: "ReviewController as model"
            })
            .when("/profile/:id/reports", {
                templateUrl: "views/profile/reports.view.html",
                controller: "ReportController as model"
            })
            .when("/thankyou", {
                templateUrl: "views/thankyou/thankyou.view.html"
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