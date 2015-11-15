var uuid = require("node-uuid"); //generates random id

module.exports = function(app, model) {
    app.get("/api/assignment/form/:formId/field", findAllFields);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteField);
    app.post("/api/assignment/form/:formId/field", createField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);

    function findAllFields(req, res) {
        var formId = req.params.formId;
        res.json(model.findAllFields(formId));
    }

    function findFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(model.findFieldById(formId, fieldId));
    }

    function deleteField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(model.deleteField(formId, fieldId));
    }

    function createField(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        field.id = uuid.v4();
        res.json(model.createField(formId, field));
    }

    function updateField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        res.json(model.updateField(formId, fieldId, field));
    }
};
