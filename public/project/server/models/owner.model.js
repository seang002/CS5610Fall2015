"use strict";
var users = require("./owner.mock.json");

module.exports = function(app) {
    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserByEmail: findUserByEmail,
        findUserByCred: findUserByCred,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;

    function createUser(user) {
        if (!findUserByEmail(user.email)) {
            users.push(user);
            return users;
        } else {
            return null;
        }
    }

    function findAllUsers() {
        return users;
    }

    function findUserByEmail(email) {
        for (var i in users) {
            if (users[i].email == email) {
                return users[i];
            }
        }
        return null;
    }

    function findUserByCred(cred) {
        for (var i in users) {
            if (users[i].email == cred.email && users[i].password == cred.password) {
                return users[i];
            }
        }
        return null;
    }

    function updateUser(id, user) {
        for (var i in users) {
            if (users[i].id == id) {
                if (users[i].email == user.email || !findUserByEmail(user.email)) {
                    users.splice(i, 1, user);
                    return users[i];
                }
            }
        }
        return null;
    }

    function deleteUser(id) {
        for (var i in users) {
            if (users[i].id == id) {
                users.splice(i, 1);
                break;
            }
        }
        return users;
    }
};