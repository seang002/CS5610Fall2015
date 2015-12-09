"use strict";
var q = require("q");

module.exports = function(mongoose, db) {
    var OwnerSchema = require("./owner.schema.js")(mongoose);
    var OwnerModel = mongoose.model("OwnerModel", OwnerSchema);

    var api = {
        createOwner: createOwner,
        findAllOwners: findAllOwners,
        findOwnerByEmail: findOwnerByEmail,
        findOwnerByCred: findOwnerByCred,
        updateOwner: updateOwner,
        deleteOwner: deleteOwner
    };
    return api;

    function createOwner(owner) {
        var deferred = q.defer();
        OwnerModel
            .create(owner, function(err, owner) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(owner);
                }
            });
        return deferred.promise;
    }

    function findAllOwners() {
        var deferred = q.defer();
        OwnerModel
            .find(function(err, owners) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(owners);
                }
            });
        return deferred.promise;
    }

    function findOwnerByEmail(email) {
        var deferred = q.defer();
        OwnerModel
            .findOne({email: email}, function(err, owner) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(owner);
                }
            });
        return deferred.promise;
    }

    function findOwnerByCred(cred) {
        var deferred = q.defer();
        OwnerModel
            .findOne({email: cred.email, password: cred.password}, function(err, owner) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(owner);
                }
            });
        return deferred.promise;
    }

    function updateOwner(id, owner) {
        var deferred = q.defer();
        delete owner._id;

        OwnerModel
            .update({_id: id}, {$set: owner}, function(err, owner) {
                OwnerModel.findById(id, function(err, owner) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(owner);
                    }
                })
            });
        return deferred.promise;
    }

    function deleteOwner(id) {
        var deferred = q.defer();
        OwnerModel
            .remove({_id: id}, function(err, status) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(status);
                }
            });
        return deferred.promise;
    }
};