"use strict";
var q = require("q");

module.exports = function(mongoose, db) {
    var ApptSchema = require("./appt.schema.js")(mongoose);
    var ApptModel = mongoose.model("ApptModel", ApptSchema);

    var api = {
        createAppt: createAppt,
        findApptsByUserId: findApptsByUserId,
        deleteAppt: deleteAppt,
        deleteApptsByWalkerId: deleteApptsByWalkerId,
        deleteApptsByOwnerId: deleteApptsByOwnerId,
        acceptAppt: acceptAppt
    };
    return api;

    function createAppt(appt) {
        var deferred = q.defer();
        ApptModel
            .create(appt, function(err, appt) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(appt);
                }
            });
        return deferred.promise;
    }

    function findApptsByUserId(userType, userId) {
        var deferred = q.defer();
        if (userType == "walker") {
            ApptModel
                .find({walkerId: userId}, function(err, appts) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(appts);
                    }
                });
        } else {
            ApptModel
                .find({ownerId: userId}, function(err, appts) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(appts);
                    }
                });
        }
        return deferred.promise;
    }

    function deleteAppt(id) {
        var deferred = q.defer();
        ApptModel
            .remove({_id: id}, function(err, appt) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(appt);
                }
            });
        return deferred.promise;
    }

    function deleteApptsByWalkerId(id) {
        var deferred = q.defer();
        ApptModel
            .remove({walkerId: id}, function(err, appt) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(appt);
                }
            });
        return deferred.promise;
    }

    function deleteApptsByOwnerId(id) {
        var deferred = q.defer();
        ApptModel
            .remove({ownerId: id}, function(err, appt) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(appt);
                }
            });
        return deferred.promise;
    }

    function acceptAppt(id, appt) {
        var deferred = q.defer();
        delete appt._id;
        ApptModel
            .update({_id: id}, {$set: appt}, function(err, appt) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(findApptsByUserId("walker", appt.userId));
                }
            });
        return deferred.promise;
    }
};