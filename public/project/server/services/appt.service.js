"use strict";

module.exports = function(app, model) {
    app.post("/api/project/walker/:walkerId/appt/:ownerId", requestAppt);

    function requestAppt(req, res) {
        var appt = req.body;
        model
            .requestAppt(appt)
            .then(function(appts) {
                res.json(appts);
            })
    }
};