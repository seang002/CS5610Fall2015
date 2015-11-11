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

        var userForms = [];

        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };
        return service;

        function createFormForUser(userId, form, callback) {
            form.id = guid();
            form.userId = userId;
            forms.push(form);
            userForms.push(form);
            console.log(userForms); //checking if form added to array
            callback(form);
        }

        function findAllFormsForUser(userId, callback) {
            console.log(userId);
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
            //update all forms overall
            for (var i = 0; i < forms.length; i++) {
                if (forms[i].id == formId) {
                    forms.splice(i, 1);
                }
            }

            //update forms for user
            for (var i = 0; i < userForms.length; i++) {
                if (userForms[i].id == formId) {
                    userForms.splice(i, 1);
                }
            }
            console.log(forms); //checking if form deleted in array
            callback(userForms);
        }

        function updateFormById(formId, newForm, callback) {
            for (var i in forms) {
                var form = forms[i];
                if (form.id == formId) {
                    form.name = newForm.name;
                    callback(form);
                }
            }
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