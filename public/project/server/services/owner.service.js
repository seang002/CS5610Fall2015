"use strict";

module.exports = function(app, model) {
    app.post("/api/project/owner", createOwner);
    app.get("/api/project/owner", findOwner);
    app.get("/api/project/owner/:id", findOwnerById);
    app.put("/api/project/owner/:id", updateOwner);
    app.delete("/api/project/owner/:id", deleteOwner);

    function createOwner(req, res) {
        var owner = req.body;
        model
            .findOwnerByEmail(owner.email)
            .then(function(isOwner) {
                if (!isOwner) {
                    model
                        .createOwner(owner)
                        .then(function(owner) {
                            console.log("Registration success!");
                            res.json(owner);
                        })
                } else {
                    console.log("Error in registration.");
                    res.json(null);
                }
            })
    }

    function findOwner(req, res) {
        var email = req.query.email;
        var password = req.query.password;
        if (email && password) {
            model
                .findOwnerByCred({email: email, password: password})
                .then(function(owner) {
                    res.json(owner);
                })
        } else {
            res.json(null);
        }
    }

    function findOwnerById(req, res) {
        var id = req.params.id;
        model
            .findOwnerById(id)
            .then(function(owner) {
                res.json(owner)
            })
    }

    function updateOwner(req, res) {
        var id = req.params.id;
        var owner = req.body;
        model
            .updateOwner(id, owner)
            .then(function(owner) {
                res.json(owner)
            })
    }

    function deleteOwner(req, res) {
        var id = req.params.id;
        model
            .deleteOwner(id)
            .then(function(owners) {
                res.json(owners);
            })
    }
};