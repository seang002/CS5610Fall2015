var uuid = require("node-uuid"); //generates random id

module.exports = function(app, model) {
    app.post("/api/assignment/user", createNewUser);
    app.get("/api/assignment/user", findUser);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);

    function createNewUser(req, res) {
        var user = req.body;
        user.id = uuid.v4();
        console.log(user); //checking if user variable is correct
        res.json(model.createUser(user));
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        console.log("Username: " + username); //checking values of username and
        console.log("Password: " + password); //password variables

        //responds w/ single user w/ username and password props
        if (username && password) {
            var cred = {username: username, password: password};
            res.json(model.findUserByCredentials(cred));

        //responds w/ array of users
        } else {
            res.json(model.findAllUsers());
        }
    }

    function findUserById(req, res) {
        var id = req.params.id;
        res.json(model.findUserById(id));
    }

    function updateUser(req, res) {
        var id = req.params.id;
        var user = req.body;
        res.json(model.updateUser(id, user));
    }

    function deleteUser(req, res) {
        var id = req.params.id;
        res.json(model.deleteUser(id));
    }
};