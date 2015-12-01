"use strict";
var q = require("q");

module.exports = function(mongoose, db) {
    var FormSchema = require("./form.schema.js")(mongoose);
    var FormModel = mongoose.model("FormModel", FormSchema);

    var api = {
        createForm: createForm,
        findAllUserForms: findAllUserForms,
        findFormById: findFormById,
        findFormByTitle: findFormByTitle,
        updateForm: updateForm,
        deleteForm: deleteForm,

        findAllFields: findAllFields,
        findFieldById: findFieldById,
        deleteField: deleteField,
        createField: createField,
        updateField: updateField
    };
    return api;

    function createForm(formObj) {
        var deferred = q.defer();
        FormModel
            .create(formObj, function(err, form) {
                console.log(formObj);
                if (err || findFormByTitle(formObj.userId, formObj.title)) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(findAllUserForms(form.userId));
                }
            });
        return deferred.promise;
    }

    function findAllUserForms(userId) {
        var deferred = q.defer();
        FormModel
            .find({userId: userId}, function(err, forms) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(forms);
                }
            });
        return deferred.promise;
    }

    function findFormById(id) {
        var deferred = q.defer();
        FormModel
            .findById(id, function(err, form) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(form);
                }
            });
        return deferred.promise;
    }

    function findFormByTitle(userId, title) {
        var deferred = q.defer();
        FormModel
            .find({userId: userId, title: title}, function(err, form) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(form);
                }
            });
    }

    function updateForm(id, formObj) {
        var deferred = q.defer();
        FormModel
            .update({_id: id}, {$set: {title: formObj.title}}, function(err, form) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(findAllUserForms(form.userId));
                }
            });
        return deferred.promise;
    }

    function deleteForm(id) {
        var deferred = q.defer();
        FormModel
            .remove({_id: id}, function(err, form) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(form);
                }
            });
        return deferred.promise;
    }

    function findAllFields(id) {
        var deferred = q.defer();
        FormModel
            .findById(id, function(err, form) {
                deferred.resolve(form.fields);
            });
        return deferred.promise;
    }

    function findFieldById(id, fieldId) {
        var deferred = q.defer();
        FormModel
            .findById(id, function(err, form) {

            });
        return deferred.promise;
    }

    function deleteField(id, fieldId) {
        var deferred = q.defer();
        FormModel
            .findById(id, function(err, form) {
                var fields = form.fields;
                for (var i in fields) {
                    if (fields[i].id == fieldId) {
                        fields.splice(i, 1);
                        form.save(function(err, form) {
                            deferred.resolve(form);
                        });
                    }
                }
            });
        return deferred.promise;
    }

    function createField(id, fieldObj) {
        var deferred = q.defer();
        FormModel
            .findById(id, function(err, form) {
                form.fields.push(fieldObj);
                form.save(function(err, form) {
                    deferred.resolve(form);
                });
            });
        return deferred.promise;
    }

    function updateField(id, fieldId, fieldObj) {
        var deferred = q.defer();
        FormModel
            .findById(id, function(err, form) {
                var fields = form.fields;
                for (var i in fields) {
                    if (fields[i].id == fieldId) {
                        fields[i].label = fieldObj.label;
                        fields[i].placeholder = fieldObj.placeholder;
                        form.save(function(err, form) {
                            deferred.resolve(form);
                        });
                    }
                }
            });
        return deferred.promise;
    }
};