"use strict";

module.exports = function(mongoose) {
    var ReportSchema = require("./report.schema.js")(mongoose);
    var ReviewSchema = require("./review.schema.js")(mongoose);

    var walkerSchema = mongoose.Schema({
        email: String,
        password: String,
        firstName: String,
        lastName: String,
        city: String,
        days: [String],
        times: [String],
        reports: [ReportSchema],
        reviews: [ReviewSchema],
        hired: {type: String, default: "no", enum: ["yes", "no"]},
        dob: Date,
        phone: String,
        address: String,
        exp: String,
        whyApply: String
    }, {collection: "cs5610.project.walker"});

    return walkerSchema;
};