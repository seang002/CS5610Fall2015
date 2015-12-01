var q = require("q");

module.exports = function(mongoose, db) {
    var UserSchema = require("./user.schema.js")(mongoose);
    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };
    return api;

    function createUser(userObj) {
        var deferred = q.defer();
        UserModel
            .create(userObj, function(err, user) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();
        UserModel
            .find(function(err, users) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(users);
                }
            });
        return deferred.promise;
    }

    function findUserById(id) {
        var deferred = q.defer();
        UserModel
            .findById(id, function(err, user) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function updateUser(id, userObj) {
        var deferred = q.defer();
        UserModel
            .update({_id: id}, {$set: {
                firstName: userObj.firstName,
                lastName: userObj.lastName,
                username: userObj.username,
                password: userObj.password,
                email: userObj.email
            }}, function(err, user) {
                UserModel.find(function(err, user) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(user);
                    }
                })
            });
        return deferred.promise;
    }

    function deleteUser(id) {
        var deferred = q.defer();
        UserModel
            .remove({_id: id}, function(err, status) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(status);
                }
            });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        UserModel
            .findOne({username: username}, function (err, user) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function findUserByCredentials(credObj) {
        var deferred = q.defer();
        UserModel
            .findOne({username: credObj.username, password: credObj.password}, function (err, user) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }
};