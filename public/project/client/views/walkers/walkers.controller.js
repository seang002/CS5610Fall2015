(function() {
    "use strict";

    angular
        .module("DogWalkingApp")
        .controller("WalkersController", WalkersController);

    function WalkersController(WalkerService, ngDialog, $rootScope) {
        var model = this;
        model.days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        model.times = ["6-9a", "9-12p", "12-3p", "3-6p"];
        model.freqs = ["Once", "Daily", "Weekly"];

        model.search = search;
        model.searchLocation = searchLocation;
        model.moreInfo = moreInfo;
        model.requestAppt = requestAppt;
        model.writeReview = writeReview;
        model.walkers = [];

        function search(criteria) {
            model.hasResults = false;
            model.hasNoResults = false;
            console.log("Searching...");
            console.log(criteria);
            WalkerService
                .findUsersByParams(criteria)
                .then(function(walkers) {
                    model.walkers = walkers;
                    if (model.walkers.length == 0) {
                        model.hasNoResults = true;
                    } else {
                        model.hasResults = true;
                    }
                });
        }

        function searchLocation() {
            model.hasResults = false;
            model.hasNoResults = false;
            WalkerService
                .findAllUsers()
                .then(function(walkers) {
                    model.walkers = walkers;
                    if (model.walkers.length > 0) {
                        model.hasResults = true;
                    }

                    //overall walker rating
                    for (var i in model.walkers) {
                        var walker = model.walkers[i];
                        var totalRatings = 0;
                        for (var j in walker.reviews) {
                            totalRatings += walker.reviews[j].rating;
                        }
                        walker.rating = totalRatings / walker.reviews.length;
                        if (!walker.rating) {
                            walker.rating = 0;
                        }
                    }
                });
        }

        function moreInfo(id) {
            ngDialog.open({
                template: './views/profile/profilePage/walker.profilePage.view.html',
                controller: 'ProfilePageController as model',
                data: {walkerId: id}
            })
        }

        function requestAppt(id) {
            if (!$rootScope.isUser) {
                ngDialog.open({
                    template: '<div class="alert alert-warning text-center">\
                                <i class="fa fa-exclamation-triangle fa-5x"></i><br\>\
                                    Oops! You need to log in first.\
                                </div>',
                    plain: true
                })
            } else {
                ngDialog.open({
                    template: './views/profile/appointments/appt.request.view.html',
                    controller: 'RequestController as model',
                    data: {walkerId: id}
                })
            }
        }

        function writeReview(id) {
            if (!$rootScope.isUser) {
                ngDialog.open({
                    template: '<div class="alert alert-warning text-center">\
                                <i class="fa fa-exclamation-triangle fa-5x"></i><br\>\
                                    Oops! You need to log in first.\
                                </div>',
                    plain: true
                })
            } else {
                ngDialog.open({
                    template: './views/profile/reviews/createReview.view.html',
                    controller: 'createReviewController as model',
                    data: {walkerId: id}
                });
            }
        }
    }
})();