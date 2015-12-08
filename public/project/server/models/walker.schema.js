"use strict";

module.exports = function(mongoose) {
    var walkerSchema = mongoose.Schema({
        email: String,
        password: String,
        firstName: String,
        lastName: String,
        city: String,
        days: [String],
        times: [String],
        hired: {type: String, default: "no", enum: ["yes", "no"]},
        dob: Date,
        phone: String,
        address: String,
        desc: String,
        whyApply: String
    }, {collection: "cs5610.project.walker"});

    return walkerSchema;
};