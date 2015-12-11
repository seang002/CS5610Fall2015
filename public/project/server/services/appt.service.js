"use strict";

module.exports = function(app, model) {
    app.post("/api/project/appt", createAppt);
    app.get("/api/project/:userType/:userId/appt", findApptsByUserId);
    app.delete("/api/project/appt/:apptId", deleteAppt);
    app.put("/api/project/appt/:apptId", acceptAppt);

    function createAppt(req, res) {
        var appt = req.body;
        model
            .createAppt(appt)
            .then(function(appts) {
                res.json(appts);
            })
    }

    function findApptsByUserId(req, res) {
        var userType = req.params.userType;
        var userId = req.params.userId;
        model
            .findApptsByUserId(userType, userId)
            .then(function(appts) {
                res.json(appts);
            });
    }

    function deleteAppt(req, res) {
        var apptId = req.params.apptId;
        model
            .deleteAppt(apptId)
            .then(function(appts) {
                res.json(appts);
            })
    }

    function acceptAppt(req, res) {
        var apptId = req.params.apptId;
        var appt = req.body;
        model
            .acceptAppt(apptId, appt)
            .then(function(appts) {
                res.json(appts);
            })
    }
};