/* Created by verena2 on 10/19/15. */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location) {
        $scope.$location = $location;
    }
})();