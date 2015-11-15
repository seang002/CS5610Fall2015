var users = require("./user.mock.json");

module.exports = function(app) {
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
        if (!findUserByUsername(userObj.username)) { //checks if username already exists
            users.push(userObj);
            return users;
        } else {
            return null;
        }
    }

    function findAllUsers() {
        return users;
    }

    function findUserById(id) {
        for (var i in users) {
            var user = users[i];
            if (user.id == id) {
                return user;
            }
        }
        return null;
    }

    function updateUser(id, userObj) {
        for (var i in users) {
            var user = users[i];
            if (user.id == id) {
                if (user.username == userObj.username || !findUserByUsername(userObj.username)) {
                    users.splice(i, 1, userObj);
                    return users;
                }
            }
        }
        return null;
    }

    function deleteUser(id) {
        for (var i in users) {
            var user = users[i];
            if (user.id == id) {
                users.splice(i, 1)
                break; //to exit loop
            }
        }
        return users;
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