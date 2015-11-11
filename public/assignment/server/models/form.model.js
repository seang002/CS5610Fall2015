var forms = require("./form.mock.json");

module.exports = function(app) {
    var api = {
        create : create,
        findAll : findAll,
        findById : findById,
        update : update,
        remove : remove,
        findFormByTitle: findFormByTitle
    }
    return api;

    function create(formObj) {
        forms.push(formObj);
        return forms;
    }

    function findAll() {
        return forms;
    }

    function findById(id) {
        for (var i in forms) {
            var form = forms[i];
            if (form.id == id) {
                return form;
            }
        }
        return null;
    }

    function update(id, formObj) {
        for (var i in forms) {
            var form = forms[i];
            if (form.id == id) {
                form = formObj;
                return; //to exit early
            }
        }
    }

    function remove(id) {
        for (var i in forms) {
            var form = forms[i];
            if (form.id == id) {
                forms.splice(i, 1)
                return; //to exit early
            }
        }
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
}