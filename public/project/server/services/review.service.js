"use strict";

module.exports = function(app, walkerModel, ownerModel) {
    app.get("/api/project/walker/:walkerId/review", findAllWalkerReviews);
    app.get("/api/project/owner/:ownerId/review", findAllOwnerReviews);
    app.post("/api/project/owner/:ownerId/walker/:walkerId/review", createReview);
    app.delete("/api/project/owner/:ownerId/walker/:walkerId/review/:reviewId", deleteReview);
    app.put("/api/project/owner/:ownerId/walker/:walkerId/review", updateReview);

    function findAllWalkerReviews(req, res) {
        var walkerId = req.params.walkerId;
        walkerModel
            .findAllWalkerReviews(walkerId)
            .then(function(reviews) {
                res.json(reviews);
            });
    }

    function findAllOwnerReviews(req, res) {
        var ownerId = req.params.ownerId;
        console.log("Testing review.service...");
        ownerModel
            .findAllOwnerReviews(ownerId)
            .then(function(reviews) {
                res.json(reviews);
            });
    }

    function createReview(req, res) {
        var ownerId = req.params.ownerId;
        var walkerId = req.params.walkerId;
        var review = req.body;
        ownerModel
            .createReview(ownerId, review)
            .then(function(reviews) {
                console.log("create owner review");
                res.json(reviews);
            });

        walkerModel
            .createReview(walkerId, review)
            .then(function(reviews) {
                console.log("create walker review");
                res.json(reviews);
            });
    }

    function deleteReview(req, res) {
        var ownerId = req.params.ownerId;
        var walkerId = req.params.walkerId;
        var reviewId = req.params.reviewId;
        ownerModel
            .deleteReview(ownerId, reviewId)
            .then(function(reviews) {
                console.log("delete owner review");
                res.json(reviews);
            });

        walkerModel
            .deleteReview(walkerId, ownerId)
            .then(function(reviews) {
                console.log("delete walker review");
                res.json(reviews);
            });
    }

    function updateReview(req, res) {
        var ownerId = req.params.ownerId;
        var walkerId = req.params.walkerId;
        var review = req.body;
        ownerModel
            .updateReview(ownerId, walkerId, review)
            .then(function(reviews) {
                console.log("update owner review");
                res.json(reviews);
            });

        walkerModel
            .updateReview(walkerId, ownerId, review)
            .then(function(reviews) {
                console.log("update walker review");
                res.json(reviews);
            });
    }
};