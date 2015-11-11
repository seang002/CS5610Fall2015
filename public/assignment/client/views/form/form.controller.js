(function() {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, $scope, $rootScope) {
        var user = $rootScope.user;
        var userId = user.id;
        FormService.findAllFormsForUser(userId)
            .then(function(forms) {
                $scope.forms = forms;
            });

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        function addForm() {
            var form = {title: $scope.title};
            FormService.createFormForUser(userId, form)
                .then(function(forms) {
                    $scope.forms = forms;
                })
        }

        function updateForm() {
            var form = {title: $scope.title};
            FormService.updateFormById($scope.selectedForm.id, form)
                .then(function(forms) {
                    $scope.forms = forms;
                })
        }

        function deleteForm(index) {
            var formId = $scope.forms[index].id;
            console.log(formId); //checking formId
            FormService.deleteFormById(formId)
                .then(function(forms) {
                    $scope = forms;
                })
        }

        function selectForm(index) {
            $scope.selectedForm = $scope.forms[index];
            console.log($scope.selectedForm); //checking selectedForm
            $scope.title = $scope.forms[index].title;
        }
    }
})();