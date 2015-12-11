(function() {
    "use strict";

    angular
        .module("DogWalkingApp")
        .controller("ReviewController", ReviewController);

    function ReviewController($rootScope, $location) {
        var model = this;
        if (!$rootScope.user) {
            $location.url("/home");
        } else {
            init();
        }

        function init() {

        }
    }
})();