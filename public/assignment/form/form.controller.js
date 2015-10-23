(function() {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, $scope, $rootScope) {
        var user = $rootScope.user;
        var userId = user.id;
        $scope.forms = FormService.findAllFormsForUser(user);

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        function addForm(form) {
            var newForm = FormService.createFormForUser(userId, form);
            $scope.forms.push(newForm);
        }

        function updateForm(form) {
            $scope.form = FormService.updateFormById(form.id, form);
        }

        function deleteForm(index) {
            $scope.forms = FormService.deleteFormById(index);
        }

        function selectForm(index) {
            $scope.selectedIndex = index;
            $scope.form = {
                name: $scope.forms[index].name
            };
        }
    }
})();