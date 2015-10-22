/* Created by verena2 on 10/19/15. */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, $location) {
        $scope.$location = $location;
    }
})();