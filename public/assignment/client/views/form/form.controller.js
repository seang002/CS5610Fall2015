(function() {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, $rootScope) {
        var model = this;
        var user = $rootScope.user;
        if (user) {
            var userId = user.id;
            init();
        } else {
            model.error = true;
            model.message = "User forms not found. Please log in or register.";
        }

        model.addForm = addForm;
        model.updateForm = updateForm;
        model.deleteForm = deleteForm;
        model.selectForm = selectForm;

        function init() {
            FormService
                .findAllFormsForUser(userId)
                .then(function(forms) {
                    model.forms = forms;
                });
        }

        function addForm(title) {
            var form = {title: title};
            FormService
                .createFormForUser(userId, form)
                .then(function(forms) {
                    if (!forms) {
                        model.error = true;
                        model.message = "Form title already exists. Choose a different title.";
                    } else {
                        console.log("New form created.");
                        model.forms = forms;
                    }
                });
        }

        function updateForm(title) {
            var form = {title: title, userId: user.id};
            FormService
                .updateFormById(model.selectedForm.id, form)
                .then(function(forms) {
                    if (!forms) {
                        model.error = true;
                        model.message = "Form title already exists. Choose a different title.";
                    } else {
                        console.log("Form updated.");
                        model.forms = forms;
                    }
                });
        }

        function deleteForm(index) {
            var formId = model.forms[index].id;
            console.log("Form deleted.");
            FormService
                .deleteFormById(formId)
                .then(function(forms) {
                    model.forms = forms;
                });
        }

        function selectForm(index) {
            model.selectedForm = model.forms[index];
            model.title = model.forms[index].title;
        }
    }
})();