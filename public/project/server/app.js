"use strict";

module.exports = function(app) {
    var ownerModel = require("./models/owner.model.js")(app);

    require("./services/owner.service.js")(app, ownerModel);
};