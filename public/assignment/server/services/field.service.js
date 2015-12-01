"use strict";

module.exports = function(app, model) {
    app.get("/api/assignment/form/:formId/field", findAllFields);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteField);
    app.post("/api/assignment/form/:formId/field", createField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);

    function findAllFields(req, res) {
        var formId = req.params.formId;
        model
            .findAllFields(formId)
            .then(function(fields) {
                res.json(fields);
            })
    }

    function findFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        model
            .findFieldById(formId, fieldId)
            .then(function(field) {
                res.json(field);
            })
    }

    function deleteField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        model
            .deleteField(formId, fieldId)
            .then(function(fields) {
                res.json(fields);
            })
    }

    function createField(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        model
            .createField(formId, field)
            .then(function(fields) {
                res.json(fields);
            })
    }

    function updateField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        model
            .updateField(formId, fieldId, field)
            .then(function(fields) {
                res.json(fields);
            })
    }
};
