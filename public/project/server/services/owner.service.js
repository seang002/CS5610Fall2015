"use strict";
var uuid = require("node-uuid");

module.exports = function(app, model) {
    app.post("/api/project/user", createUser);
    app.get("/api/project/user", findUser);
    app.put("/api/project/user/:id", updateUser);
    app.delete("/api/project/user/:id", deleteUser);

    function createUser(req, res) {
        var user = req.body;
        user.id = uuid.v4();
        console.log(user);
        res.json(model.createUser(user));
    }

    function findUser(req, res) {
        var email = req.query.email;
        var password = req.query.password;
        if (email && password) {
            var cred = {email: email, password: password};
            res.json(model.findUserByCred(cred));
        } else {
            res.json(model.findAllUsers());
        }
    }

    function updateUser(req, res) {
        var id = req.params.id;
        var user = req.body;
        res.json(model.updateUser(id, user));
    }

    function deleteUser(req, res) {
        var id = req.params.id;
        res.json(model.deleteUser(id));
    }
};