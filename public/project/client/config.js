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
            .when("/walkerprofile", {
                templateUrl: "walkerprofile/walkerprofile.view.html"
            })
            .when("/readreviews", {
                templateUrl: "walkerprofile/reviews.view.html"
            })
            .when("/readrequests", {
                templateUrl: "walkerprofile/requests.view.html"
            })
            .when("/sendreport", {
                templateUrl: "walkerprofile/reportcard.view.html"
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