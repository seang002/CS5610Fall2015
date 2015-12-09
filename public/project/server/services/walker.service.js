"use strict";

module.exports = function(app, model) {
    app.post("/api/project/walker", createWalker);
    app.get("/api/project/walker", findWalker);
    app.put("/api/project/walker/:id", updateWalker);
    app.delete("/api/project/walker/:id", deleteWalker);

    function createWalker(req, res) {
        var walker = req.body;
        model
            .findWalkerByEmail(walker.email)
            .then(function(isWalker) {
                if (!isWalker) {
                    model
                        .createWalker(walker)
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
        var day = req.query.day;
        var time = req.query.time;
        if (email && password) {
            model
                .findWalkerByCred({email: email, password: password})
                .then(function(walker) {
                    res.json(walker);
                })
        } else if (day && time) {
            model
                .findwalkersByParams({day: day, time: time})
                .then(function(walkers) {
                    res.json(walkers);
                })
        } else {
            model
                .findAllWalkers()
                .then(function(walkers) {
                    res.json(walkers);
                });
        }
    }

    function updateWalker(req, res) {
        var id = req.params.id;
        var walker = req.body;
        model
            .updateWalker(id, walker)
            .then(function(walker) {
                res.json(walker)
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