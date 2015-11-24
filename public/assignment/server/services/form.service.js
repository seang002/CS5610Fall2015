module.exports = function(app, model) {
    app.get("/api/assignment/user/:userId/form", findFormsByUserId);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteForm);
    app.post("/api/assignment/user/:userId/form", createNewForm);
    app.put("/api/assignment/form/:formId", updateForm);

    function findFormsByUserId(req, res) {
        var userId = req.params.userId;
        model
            .findAllUserForms(userId)
            .then(function(forms) {
                res.json(forms);
            })
    }

    function findFormById(req, res) {
        var formId = req.params.formId;
        model
            .findFormById(formId)
            .then(function(form) {
                res.json(form);
            })
    }

    function deleteForm(req, res) {
        var formId = req.params.formId;
        model
            .deleteForm(formId)
            .then(function(forms) {
                res.json(forms);
            })
    }

    function createNewForm(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        form.userId = userId;
        model
            .createForm(form)
            .then(function(forms) {
                res.json(forms);
            })
    }

    function updateForm(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        model
            .updateForm(formId, form)
            .then(function(forms) {
                res.json(forms);
            })
    }
};