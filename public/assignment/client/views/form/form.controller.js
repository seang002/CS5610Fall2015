(function() {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, $rootScope) {
        var model = this;
        var user = $rootScope.user;
        var userId = user.id;

        FormService.findAllFormsForUser(userId)
            .then(function(forms) {
                model.forms = forms;
            });

        model.addForm = addForm;
        model.updateForm = updateForm;
        model.deleteForm = deleteForm;
        model.selectForm = selectForm;

        function addForm(title) {
            var form = {title: title};
            FormService.createFormForUser(userId, form)
                .then(function(forms) {
                    model.forms = forms;
                })
        }

        function updateForm(title) {
            var form = {title: title};
            FormService.updateFormById(model.selectedForm.id, form)
                .then(function(forms) {
                    model.forms = forms;
                })
        }

        function deleteForm(index) {
            var formId = model.forms[index].id;
            FormService.deleteFormById(formId)
                .then(function(forms) {
                    model.forms = forms;
                })
        }

        function selectForm(index) {
            model.selectedForm = model.forms[index];
            model.title = model.forms[index].title;
        }
    }
})();