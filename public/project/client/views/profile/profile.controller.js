(function() {
    "use strict";

    angular
        .module("DogWalkingApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $routeParams) {
        var model = this;
        var userId = $routeParams.id;

        init();

        model.updateUser = updateUser;
        model.functionEdit = functionEdit;
        model.functionEditDone = functionEditDone;

        model.leftCol = "col-sm-12";
        model.rightCol = "";
        model.showFunctionEdit = false;
        model.functionEditIndex = -1;

        function init() {
            model.owner = {dogName: "Kibbles", email: "verena@gmail.com", breed: "Mixed", age: 4, personality: "Timid", notes: "NA"};
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