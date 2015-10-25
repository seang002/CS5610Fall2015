(function(){
    "use strict";

    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {
        var forms = [ //testing forms
            {id: guid(), userId: "123", name: "Registration"},
            {id: guid(), userId: "123", name: "Quizzes"},
            {id: guid(), userId: "234", name: "Exams"}
        ];

        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };
        return service;

        function createFormForUser(userId, form, callback) {
            var newForm = {
                id: guid(),
                userId: userId,
                name: form.name
            };
            forms.push(newForm);
            callback(newForm);
        }

        function findAllFormsForUser(userId, callback) {
            console.log("Find all forms for user.");
            var userForms = [];
            for (var i in forms){
                var form = forms[i];
                if (form.userId == userId) {
                    userForms.push(form);
                }
            }
            callback(userForms);
        }

        function deleteFormById(formId, callback) {
            console.log(formId);
            for (var i = 0; i < forms.length; i++) {
                if (forms[i].id == formId) {
                    forms.splice(i, 1);
                    break;
                }
            }
            callback(forms);
        }

        function updateFormById(formId, newForm, callback) {
            for (var form in forms) {
                if (form.id == formId) {
                    form = newForm;
                    //callback(form);
                }
            }
            //callback(newForm);
        }

        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }
    }
})();