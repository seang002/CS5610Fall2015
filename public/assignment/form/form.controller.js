(function() {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, $scope, $rootScope) {
        //var user = $rootScope.user;
        //var userId = user.id;
        var userId = "123";
        console.log(userId);
        FormService.findAllFormsForUser(userId, getUserForms);

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        function addForm(form) {
            FormService.createFormForUser(userId, form, getForm);
            FormService.findAllFormsForUser(userId, getUserForms);
        }

        function updateForm(form) {
            FormService.updateFormById(form.id, form, getForm);
            FormService.findAllFormsForUser(userId, getUserForms);
        }

        function deleteForm(index) {
            var formId = $scope.forms[index].id;
            FormService.deleteFormById(formId, getUserForms);
        }

        function selectForm(index) {
            $scope.selectedIndex = index;
            $scope.form = {
                name: $scope.forms[index].name
            };
        }

        function getUserForms(userForms) {
            console.log('get user forms');
            $scope.forms = userForms;
        }

        function getForm(form){
            $scope.form = form;
        }
    }
})();