"use strict";
var q = require("q");

module.exports = function(mongoose, db) {
    var ReviewSchema = require("./review.schema.js")(mongoose);
    var ReviewModel = mongoose.model("ReviewModel", ReviewSchema);

    var api = {
        createReview: createReview,
        findAllUserReviews: findAllUserReviews
    };
    return api;


};