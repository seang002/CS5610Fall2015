"use strict";

module.exports = function(mongoose) {
    var ReportSchema = require("./../report.schema.js")(mongoose);
    var ReviewSchema = require("./../review.schema.js")(mongoose);

    var ownerSchema = mongoose.Schema({
        email: String,
        password: String,
        dogName: String,
        breed: String,
        age: {type: Number, min: 0},
        personality: String,
        notes: String,
        reports: [ReportSchema],
        reviews: [ReviewSchema]
    }, {collection: "cs5610.project.owner"});

    return ownerSchema;
};