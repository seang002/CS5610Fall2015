var forms = require("./form.mock.json");

module.exports = function(app) {
    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        findFormById: findFormById,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormByTitle: findFormByTitle,
        findAllUserForms: findAllUserForms,
        findAllFields: findAllFields,
        findFieldById: findFieldById,
        deleteField: deleteField,
        createField: createField,
        updateField: updateField
    };
    return api;

    function createForm(formObj) {
        if (!findFormByTitle(formObj.title)) { //checks if form already exists
            forms.push(formObj);
            return findAllUserForms(formObj.userId);
        }
        return null;
    }

    function findAllForms() {
        return forms;
    }

    function findFormById(id) {
        for (var i in forms) {
            var form = forms[i];
            if (form.id == id) {
                return form;
            }
        }
        return null;
    }

    function updateForm(id, formObj) {
        if (!findFormByTitle(formObj.title)) { //checks if title already exists
            for (var i in forms) {
                var form = forms[i];
                if (form.id == id) {
                    form.title = formObj.title;
                    return findAllUserForms(formObj.userId);
                }
            }
        }
        return null;
    }

    function deleteForm(id) {
        var userId;
        for (var i in forms) {
            var form = forms[i];
            if (form.id == id) {
                userId = form.userId;
                forms.splice(i, 1);
                break; //to exit loop
            }
        }
        return findAllUserForms(userId);
    }

    function findFormByTitle(title) {
        for (var i in forms) {
            var form = forms[i];
            if (form.title == title) {
                return form;
            }
        }
        return null;
    }

    function findAllUserForms(userId) {
        var userForms = [];
        for (var i in forms) {
            var form = forms[i];
            if (form.userId == userId) {
                userForms.push(form);
            }
        }
        return userForms;
    }

    function findAllFields(id) {
        for (var i in forms) {
            var form = forms[i];
            if (form.id == id) {
                if (!form.fields) { // create empty list if null
                    form.fields = [];
                }
                return form.fields;
            }
        }
        return null;
    }

    function findFieldById(id, fieldId) {
        for (var i in forms) {
            var form = forms[i];
            if (form.id == id) {
                for (var j in form.fields) {
                    var field = form.fields[j];
                    if (field.id == fieldId) {
                        return field;
                    }
                }
            }
        }
        return null;
    }

    function deleteField(id, fieldId) {
        for (var i in forms) {
            var form = forms[i];
            if (form.id == id) {
                for (var j in form.fields) {
                    var field = form.fields[j];
                    if (field.id == fieldId) {
                        form.fields.splice(j, 1);
                        break;
                    }
                }
                break;
            }
        }
        return form.fields;
    }

    function createField(id, fieldObj) {
        for (var i in forms) {
            var form = forms[i];
            if (form.id == id) {
                form.fields.push(fieldObj);
                return form.fields;
            }
        }
        return null;
    }

    function updateField(id, fieldId, fieldObj) {
        for (var i in forms) {
            var form = forms[i];
            if (form.id == id) {
                for (var j in form.fields) {
                    var field = form.fields[j];
                    if (field.id == fieldId) {
                        form.fields.splice(j, 1, fieldObj);
                        return form.fields;
                    }
                }
            }
        }
        return null;
    }
};