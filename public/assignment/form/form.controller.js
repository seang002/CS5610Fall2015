(function() {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, $scope, $rootScope) {
        var user = $rootScope.user;
        var userId = user.id;
        //var userId = "123";
        console.log(userId);
        FormService.findAllFormsForUser(userId, callbackUserForms);

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        function addForm() {
            var form = {name: $scope.name}
            FormService.createFormForUser(userId, form, callbackForm);
        }

        function updateForm() {
            var form = {name: $scope.name};
            FormService.updateFormById(
                $scope.selectedForm.id,
                form,
                callbackForm
            );
        }

        function deleteForm(index) {
            var formId = $scope.forms[index].id;
            console.log(formId);
            FormService.deleteFormById(formId, callbackUserForms);
        }

        function selectForm(index) {
            $scope.selectedForm = $scope.forms[index];
            $scope.name = $scope.forms[index].name
        }

        function callbackUserForms(userForms) {
            console.log('get user forms');
            $scope.forms = userForms;
        }

        function callbackForm(form){
            $scope.form = form;
        }
    }
})();