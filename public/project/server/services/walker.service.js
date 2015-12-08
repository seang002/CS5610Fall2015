"use strict";

module.exports = function(app, model) {
    app.post("/api/project/walker", createWalker);
    app.get("/api/project/walker", findWalker);
    app.put("/api/project/walker/:id", updateWalker);
    app.delete("/api/project/walker/:id", deleteWalker);

    function createWalker(req, res) {
        var walker = req.body;
        console.log("Registering");
        model
            .findWalkerByEmail(walker.email)
            .then(function(isWalker) {
                if (!isWalker) {
                    model
                        .createOwner(walker)
                        .then(function(walker) {
                            console.log("Registration success!");
                            res.json(walker);
                        })
                } else {
                    console.log("Error in registration.");
                    res.json(null);
                }
            })
    }

    function findWalker(req, res) {
        var email = req.query.email;
        var password = req.query.password;
        if (email && password) {
            model
                .findWalkerByCred({email: email, password: password})
                .then(function(walker) {
                    res.json(walker);
                })
        } else {
            res.json(null);
        }
    }

    function updateWalker(req, res) {
        var id = req.params.id;
        var walker = req.body;
        model
            .updateOwner(id, walker)
            .then(function(walkers) {
                res.json(walkers[0])
            })
    }

    function deleteWalker(req, res) {
        var id = req.params.id;
        model
            .deleteWalker(id)
            .then(function(walkers) {
                res.json(walkers);
            })
    }
};