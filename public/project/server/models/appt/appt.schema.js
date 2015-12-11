"use strict";

module.exports = function(mongoose) {
    var ReportSchema = require("./../report.schema.js")(mongoose);

    var apptSchema = mongoose.Schema ({
        ownerId: String,
        walkerId: String,
        dogName: String,
        walker: String,
        date: Date,
        day: String,
        time: String,
        freq: {type: String, enum: ["Once", "Daily", "Weekly"]},
        size: {type: String, enum: ["Small", "Medium", "Large"]},
        accepted: {type: String, enum: ["Yes", "No", "Unread"], default: "Unread"},
        notes: String,
        report: ReportSchema
    }, {collection: "cs5610.project.appt"});

    return apptSchema;
};