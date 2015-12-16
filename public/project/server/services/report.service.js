"use strict";

module.exports = function(app, walkerModel, ownerModel) {
    app.get("/api/project/walker/:walkerId/report", findAllWalkerReports);
    app.get("/api/project/owner/:ownerId/report", findAllOwnerReports);
    app.post("/api/project/owner/:ownerId/walker/:walkerId/report", createReport);
    app.delete("/api/project/owner/:ownerId/walker/:walkerId/report/:reportId", deleteReport);
    app.put("/api/project/owner/:ownerId/walker/:walkerId/report", updateReport);

    function findAllWalkerReports(req, res) {
        var walkerId = req.params.walkerId;
        walkerModel
            .findAllWalkerReports(walkerId)
            .then(function(reports) {
                res.json(reports);
            });
    }

    function findAllOwnerReports(req, res) {
        var ownerId = req.params.ownerId;
        console.log("Testing review.service...");
        ownerModel
            .findAllOwnerReports(ownerId)
            .then(function(reports) {
                res.json(reports);
            });
    }

    function createReport(req, res) {
        var ownerId = req.params.ownerId;
        var walkerId = req.params.walkerId;
        var report = req.body;
        ownerModel
            .createReport(ownerId, report)
            .then(function(reports) {
                console.log("create owner report");
                res.json(reports);
            });

        walkerModel
            .createReport(walkerId, report)
            .then(function(reports) {
                console.log("create walker report");
                res.json(reports);
            });
    }

    function deleteReport(req, res) {
        var ownerId = req.params.ownerId;
        var walkerId = req.params.walkerId;
        ownerModel
            .deleteReport(ownerId, walkerId)
            .then(function(reports) {
                console.log("delete owner report");
                res.json(reports);
            });

        walkerModel
            .deleteReport(walkerId, ownerId)
            .then(function(reports) {
                console.log("delete walker report");
                res.json(reports);
            });
    }

    function updateReport(req, res) {
        var ownerId = req.params.ownerId;
        var walkerId = req.params.walkerId;
        var review = req.body;
        ownerModel
            .updateReport(ownerId, walkerId, review)
            .then(function(reviews) {
                console.log("update owner review");
                res.json(reviews);
            });

        walkerModel
            .updateReport(walkerId, ownerId, review)
            .then(function(reviews) {
                console.log("update walker review");
                res.json(reviews);
            });
    }
};