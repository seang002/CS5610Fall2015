(function(){
    "use strict";

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {
        var currentUsers = [
            { //testing object
                username:"admin",
                password: "admin",
                id: guid(),
                email: "admin@gmail.com",
                firstName: "verena",
                lastName: "chung"
            }
        ];

        var service = {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return service;

        function findUserByUsernameAndPassword(username, password, callback) {
            for (var user in currentUsers) {
                if (user.username == username && user.password == password) {
                    console.log("TESTING: found user!");
                    callback(user);
                    break;
                }
            }
            callback(null);
        }

        function findAllUsers(callback) {
            callback(currentUsers);
        }

        function createUser(userObj, callback) {
            var newUser = userObj;
            newUser.id = guid();
            currentUsers.push(newUser);
            callback(newUser);
        }

        function deleteUserById(userId, callback) {
            for (var i = 0; i < currentUsers.length; i++) {
                if (currentUsers[i].id == userId) {
                    currentUsers.splice(i, 1);
                    break;
                }
            }
            callback(currentUsers);
        }

        function updateUser(userId, userObj, callback) {
            for (var user in currentUsers) {
                if (user.id == userId) {
                    user = userObj;
                    callback(user);
                }

            }
            //callback(userObj);
        }

        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }

            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }
    }
})();