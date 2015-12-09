"use strict";

module.exports = function(mongoose) {
    var reportSchema = mongoose.Schema({
        ownerId: String,
        walkerId: String,
        distanceWalked: Number,
        timeWalked: Number,
        pooped: {type: String, enum: ["Yes", "No"]},
        peed: {type: String, enum: ["Yes", "No"]},
        notes: String
    });

    return reportSchema;
};