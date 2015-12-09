"use strict";
var q = require("q");

module.exports = function(mongoose, db) {
    var WalkerSchema = require("./walker.schema.js")(mongoose);
    var WalkerModel = mongoose.model("WalkerModel", WalkerSchema);

    var api = {
        createWalker: createWalker,
        findAllWalkers: findAllWalkers,
        findWalkerByEmail: findWalkerByEmail,
        findWalkerByCred: findWalkerByCred,
        findwalkersByParams: findWalkersByParams,
        updateWalker: updateWalker,
        deleteWalker: deleteWalker
    };
    return api;

    function createWalker(walker) {
        var deferred = q.defer();
        WalkerModel
            .create(walker, function(err, walker) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(walker);
                }
            });
        return deferred.promise;
    }

    function findAllWalkers() {
        var deferred = q.defer();
        WalkerModel
            .find({hired: "yes"}, function(err, walkers) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(walkers);
                }
            });
        return deferred.promise;
    }

    function findWalkerByEmail(email) {
        var deferred = q.defer();
        WalkerModel
            .findOne({email: email}, function(err, walker) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(walker);
                }
            });
        return deferred.promise;
    }

    function findWalkerByCred(cred) {
        var deferred = q.defer();
        WalkerModel
            .findOne({email: cred.email, password: cred.password}, function(err, walker) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(walker);
                }
            });
        return deferred.promise;
    }

    function findWalkersByParams(params) {
        var deferred = q.defer();
        WalkerModel
            .find({days: params.day, times: params.time}, function(err, walker) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(walker);
                }
            });
        return deferred.promise;
    }

    function updateWalker(id, walker) {
        var deferred = q.defer();
        delete walker._id;

        if (walker.days) {
            var days = walker.days.toString().replace(/\s/g, "").split(",");
            walker.days = days;
        }

        if (walker.times) {
            var times = walker.times.toString().replace(/\s/g, "").split(",");
            walker.times = times;
        }

        WalkerModel
            .update({_id: id}, {$set: walker}, function(err, walker) {
                WalkerModel.findById(id, function(err, walker) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(walker);
                    }
                })
            });
        return deferred.promise;
    }

    function deleteWalker(id) {
        var deferred = q.defer();
        WalkerModel
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