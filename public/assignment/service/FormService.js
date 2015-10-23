(function(){
    "use strict";

    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {
        var forms = [
            {//testing object

            }
        ];

        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };
        return service;

        function createFormForUser(userId, form, callback) {
            var newForm = form;
            newForm.id = guid();
            newForm.userid = userId;
            forms.push(newForm);
            callback(newForm);
        }

        function findAllFormsForUser(userId, callback) {
            for (var form in forms) {
                if (form.userid == userId) {
                    callback(form);
                }
            }
            callback([]);
        }

        function deleteFormById(formId, callback) {
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
                    callback(form);
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