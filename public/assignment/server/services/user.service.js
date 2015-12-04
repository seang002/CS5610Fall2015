"use strict";

module.exports = function(app, model) {
    app.post("/api/assignment/user", createNewUser);
    app.get("/api/assignment/user", findUser);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);

    function createNewUser(req, res) {
        var user = req.body;
        console.log("Registering '" + user.username + "'...");
        model
            .findUserByUsername(user.username)
            .then(function(isUser) {
                if (!isUser) {
                    model
                        .createUser(user)
                        .then(function(user) {
                            console.log("Registration successful!");
                            res.json(user);
                        })
                } else {
                    console.log("Registration failed, gg.");
                    res.json(null);
                }
            });
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        if (username && password) {
            var cred = {username: username, password: password};
            model
                .findUserByCredentials(cred)
                .then(function(user) {
                    res.json(user);
                })
        } else {
            model
                .findAllUsers()
                .then(function(users) {
                    res.json(users);
                })
        }
    }

    function findUserById(req, res) {
        var id = req.params.id;
        model
            .findUserById(id)
            .then(function(user) {
                res.json(user);
            })
    }

    function updateUser(req, res) {
        var id = req.params.id;
        var user = req.body;
        model
            .updateUser(id, user)
            .then(function(users) {
                res.json(users);
            })
    }

    function deleteUser(req, res) {
        var id = req.params.id;
        model
            .deleteUser(id)
            .then(function(users) {
                res.json(users);
            })
    }
};