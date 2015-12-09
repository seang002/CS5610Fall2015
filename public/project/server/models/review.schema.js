"use strict";

module.exports = function(mongoose) {
    var reviewSchema = mongoose.Schema({
        ownerId: String,
        walkerId: String,
        rating: {type: Number, min: 1, max: 4},
        note: String
    });

    return reviewSchema;
};