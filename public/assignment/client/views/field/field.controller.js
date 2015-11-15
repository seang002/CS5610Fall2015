(function() {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController(FieldService, $routeParams) {
        var model = this;
        var userId = $routeParams["userId"];
        var formId = $routeParams["formId"];
        init();

        model.addField = addField;
        model.deleteField = deleteField;
        model.editField = editField;
        model.copyField = copyField;

        function init() {
            FieldService
                .getFieldsForForm(formId)
                .then(function(fields) {
                    model.fields = fields;
                });
        }

        function addField(fieldType) {
            var newField = {"id": null, "type": fieldType};

            if (fieldType == "TEXT" || fieldType == "TEXTAREA") {
                newField.label = "New Text Field";
                newField.placeholder = "New Field";
            } else if (fieldType == "DATE") {
                newField.label = "New Date Field";
            } else if (fieldType == "DROPDOWN") {
                newField.label = "New Dropdown";
                newField.options = [
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"},
                    {"label": "Option 3", "value": "OPTION_3"}
                ];
            } else if (fieldType == "CHECKBOX") {
                newField.label = "New Checkboxes";
                newField.options = [
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
                ];
            } else { //fieldType == "RADIO"
                newField.label = "New Radio Buttons";
                newField.options = [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}
                ];
            }

            FieldService
                .createFieldForForm(formId, newField)
                .then(function(fields) {
                    model.fields = fields;
                });
        }

        function deleteField(field) {
            FieldService
                .deleteFieldFromForm(formId, field.id)
                .then(function(fields) {
                    console.log("Deleted field.");
                    model.fields = fields;
                });
        }

        function editField(field) {
            FieldService
                .updateField(formId, field.id, field)
                .then(function(fields) {
                    console.log("Updated field.");
                    model.fields = fields;
                });
        }

        function copyField(field) {
            FieldService
                .getFieldForForm(formId, field.id)
                .then(function(fields) {
                    console.log("Copied field.");
                    model.fields = fields;
                });
        }
    }
})();