(function() {
    "use strict";

    angular
        .module("DogWalkingApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location) {
        $scope.$location = $location;
    }
})();