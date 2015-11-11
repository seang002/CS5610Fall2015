var users = require("./user.mock.json");

module.exports = function(app) {
    var api = {
        create : create,
        findAll : findAll,
        findById : findById,
        update : update,
        remove : remove,
        findUserByUsername : findUserByUsername,
        findUserByCredentials : findUserByCredentials
    }
    return api;

    function create(userObj) {
        users.push(userObj);
        return users;
    }

    function findAll() {
        return users;
    }

    function findById(id) {
        for (var i in users) {
            var user = users[i];
            if (user.id == id) {
                return user;
            }
        }
        return null;
    }

    function update(id, userObj) {
        for (var i in users) {
            var user = users[i];
            if (user.id == id) {
                user = userObj;
                return; //to exit early
            }
        }
    }

    function remove(id) {
        for (var i in users) {
            var user = users[i];
            if (user.id == id) {
                users.splice(i, 1)
                return; //to exit early
            }
        }
    }

    function findUserByUsername(username) {
        for (var i in users) {
            var user = users[i];
            if (user.username == username) {
                return user;
            }
        }
        return null;
    }

    function findUserByCredentials(credObj) {
        for (var i in users) {
            var user = users[i];
            if (user.username == credObj.username && user.password == credObj.password) {
                return user;
            }
        }
        return null;
    }
}