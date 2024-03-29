(function() {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, $rootScope) {
        var model = this;
        var user = $rootScope.user;
        if (user) {
            var userId = user._id;
            model.loggedOn = true;
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
                    if (model.forms.length > 0) {
                        model.hasForms = true;
                    }
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
                        FormService
                            .findAllFormsForUser(userId)
                            .then(function(forms) {
                                console.log("New form created.");
                                model.forms = forms;
                                if (model.forms.length > 0) {
                                    model.hasForms = true;
                                }
                            })
                    }
                });
        }

        function updateForm(title) {
            var form = {title: title, userId: userId};
            FormService
                .updateFormById(model.selectedForm._id, form)
                .then(function(forms) {
                    if (!forms) {
                        model.error = true;
                        model.message = "Form title already exists. Choose a different title.";
                    } else {
                        FormService
                            .findAllFormsForUser(userId)
                            .then(function(forms) {
                                console.log("Form updated.");
                                model.forms = forms;
                            })
                    }
                });
        }

        function deleteForm(index) {
            var formId = model.forms[index]._id;
            console.log("Form deleted.");
            FormService
                .deleteFormById(formId)
                .then(function(forms) {
                    FormService
                        .findAllFormsForUser(userId)
                        .then(function(forms) {
                            console.log("Form deleted.");
                            model.forms = forms;
                            if (model.forms.length == 0) {
                                model.hasForms = false;
                            }
                        })
                });
        }

        function selectForm(index) {
            model.selectedForm = model.forms[index];
            model.title = model.forms[index].title;
        }
    }
})();