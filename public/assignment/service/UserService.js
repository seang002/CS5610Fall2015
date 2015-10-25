(function(){
    "use strict";

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {
        var currentUsers = [ //testing users
            {id: "123", username:"admin", password: "admin", firstName: "admin", lastName: "admin", email: "admin@gmail.com"},
            {id: guid(), username:"verena", password: "chung", firstName: "verena", lastName: "chung", email: "verena@gmail.com"}
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
            for (var i in currentUsers) {
                var user = currentUsers[i];
                if (user.username == username && user.password == password) {
                    console.log("User found!");
                    callback(user);
                    return; //to exit function early
                }
            }
            console.log("User not found.");
            callback(null);
        }

        function findAllUsers(callback) {
            callback(currentUsers);
        }

        function createUser(userObj, callback) {
            var newUser = userObj;
            newUser.id = guid();
            currentUsers.push(newUser);
            console.log(currentUsers); //checking if user added to array
            callback(newUser);
        }

        function deleteUserById(userId, callback) {
            for (var i = 0; i < currentUsers.length; i++) {
                if (currentUsers[i].id == userId) {
                    currentUsers.splice(i, 1);
                    return; //to exit function early
                }
            }
            callback(currentUsers);
        }

        function updateUser(userId, userObj, callback) {
            for (var i in currentUsers) {
                var user = currentUsers[i];
                if (user.id == userId) {
                    user = userObj;
                    callback(user);
                    return; //to exit function early
                }

            }
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