"use strict";
var q = require("q");

module.exports = function(mongoose, db) {
    var OwnerSchema = require("./owner.schema.js")(mongoose);
    var OwnerModel = mongoose.model("OwnerModel", OwnerSchema);

    var api = {
        createOwner: createOwner,
        findOwnerById: findOwnerById,
        findOwnerByEmail: findOwnerByEmail,
        findOwnerByCred: findOwnerByCred,
        updateOwner: updateOwner,
        deleteOwner: deleteOwner,

        findAllOwnerReviews: findAllOwnerReviews,
        createReview: createReview,
        deleteReview: deleteReview,
        updateReview: updateReview,

        findAllOwnerReports: findAllOwnerReports,
        createReport: createReport,
        deleteReport: deleteReport,
        updateReport: updateReport
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

    function findOwnerById(id) {
        var deferred = q.defer();
        OwnerModel
            .findById(id, function(err, owner) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(owner);
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
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(owner);
                }
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

    function findAllOwnerReviews(id) {
        var deferred = q.defer();
        OwnerModel
            .findById(id, function(err, owner) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(owner.reviews);
                }
            });
        return deferred.promise;
    }

    function createReview(id, review) {
        var deferred = q.defer();
        OwnerModel
            .findById(id, function(err, owner) {
                owner.reviews.push(review);
                owner.save(function(err, review) {
                    deferred.resolve(review);
                });
            });
        return deferred.promise;
    }

    function deleteReview(id, reviewId) {
        var deferred = q.defer();
        OwnerModel
            .findById(id, function(err, owner) {
                var reviews = owner.reviews;
                for (var i in reviews) {
                    if (reviews[i].id == reviewId) {
                        reviews.splice(i, 1);
                        owner.save(function(err, owner) {
                            deferred.resolve(owner);
                        });
                    }
                }
            });
        return deferred.promise;
    }

    function updateReview(id, walkerId, review) {
        var deferred = q.defer();
        OwnerModel
            .findById(id, function(err, owner) {
                var reviews = owner.reviews;
                for (var i in reviews) {
                    if (reviews[i].walkerId == walkerId) {
                        reviews[i].rating = review.rating;
                        reviews[i].note = review.note;
                        owner.save(function(err, owner) {
                            deferred.resolve(owner);
                        });
                    }
                }
            });
        return deferred.promise;
    }

    function findAllOwnerReports(id) {
        var deferred = q.defer();
        OwnerModel
            .findById(id, function(err, owner) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(owner.reports);
                }
            });
        return deferred.promise;
    }

    function createReport(id, report) {
        var deferred = q.defer();
        OwnerModel
            .findById(id, function(err, owner) {
                owner.reports.push(report);
                owner.save(function(err, report) {
                    deferred.resolve(report);
                });
            });
        return deferred.promise;
    }

    function deleteReport(id, reportId) {
        var deferred = q.defer();
        OwnerModel
            .findById(id, function(err, owner) {
                var reports = owner.reports;
                for (var i in reports) {
                    if (reports[i].id == reportId) {
                        reports.splice(i, 1);
                        owner.save(function(err, owner) {
                            deferred.resolve(owner);
                        });
                    }
                }
            });
        return deferred.promise;
    }

    function updateReport(id, walkerId, report) {
        var deferred = q.defer();
        OwnerModel
            .findById(id, function(err, owner) {
                var reports = owner.reports;
                for (var i in reports) {
                    if (reports[i].walkerId == walkerId) {
                        reports[i].timeWalked = report.timeWalked;
                        reports[i].pooped = report.pooped;
                        reports[i].peed = report.peed;
                        reports[i].notes = report.notes;
                        owner.save(function(err, owner) {
                            deferred.resolve(owner);
                        });
                    }
                }
            });
        return deferred.promise;
    }
};