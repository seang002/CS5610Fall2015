"use strict";
var q = require("q");

module.exports = function(mongoose, db) {
    var ApptSchema = require("./appt.schema.js")(mongoose);
    var ApptModel = mongoose.model("ApptModel", ApptModel);

    var api = {
        requestAppt: requestAppt
    };
    return api;

    function requestAppt(appt) {
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
}