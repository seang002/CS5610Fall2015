(function() {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController(FieldService, $routeParams) {
        var model = this;
        model.fields = ["text", "textarea", "date", "dropdown", "check", "rad"];
        model.fieldType = model.fields[0];
    }
})();