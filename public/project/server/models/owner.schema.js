"use strict";

module.exports = function(mongoose) {
    var ownerSchema = mongoose.Schema({
        email: String,
        password: String,
        dogName: String,
        breed: String,
        age: {type: Number, min: 0},
        personality: String,
        notes: String
    }, {collection: "cs5610.project.owner"});

    return ownerSchema;
};