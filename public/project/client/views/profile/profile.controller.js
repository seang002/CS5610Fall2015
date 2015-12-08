(function() {
    "use strict";

    angular
        .module("DogWalkingApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(OwnerService, $routeParams, $rootScope, $location) {
        var model = this;
        var id = $routeParams["id"];
        model.isWalker = $rootScope.isWalker;
        model.isOwner = !model.isWalker;

        if ($rootScope.user) {
            init();
        } else {
            $location.url("/home");
        }

        model.updateUser = updateUser;
        model.functionEdit = functionEdit;
        model.functionEditDone = functionEditDone;

        model.leftCol = "col-sm-12";
        model.rightCol = "";
        model.showFunctionEdit = false;
        model.functionEditIndex = -1;

        function init() {
            model.owner = $rootScope.user;
        }

        function updateUser() {

        }

        function functionEdit(editIndex) {
            model.functionEditIndex = editIndex;
            model.leftCol = "col-sm-6";
            model.rightCol = "col-sm-6";
            model.showFunctionEdit = true;
        }

        function functionEditDone() {
            model.functionEditIndex = -1;
            model.leftCol = "col-sm-12";
            model.rightCol = "";
            model.showFunctionEdit = false;
        }
    }
})();