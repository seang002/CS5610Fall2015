var uuid = require("node-uuid"); //generates random id

module.exports = function(app, model) {
    app.get("/api/assignment/user/:userId/form", findFormsByUserId);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteForm);
    app.post("/api/assignment/user/:userId/form", createNewForm);
    app.put("/api/assignment/form/:formId", updateForm);

    function findFormsByUserId(req, res) {
        var userId = req.params.userId;
        res.json(model.findAllUserForms(userId));
    }

    function findFormById(req, res) {
        var formId = req.params.formId;
        res.json(model.findFormById(formId));
    }

    function deleteForm(req, res) {
        var formId = req.params.formId;
        res.json(model.deleteForm(formId));
    }

    function createNewForm(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        form.userId = userId;
        form.id = uuid.v4();
        res.json(model.createForm(form));
    }

    function updateForm(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        res.json(model.updateForm(formId, form));
    }
};