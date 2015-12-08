"use strict";

module.exports = function(app, mongoose, db) {
    var ownerModel = require("./models/owner.model.js")(mongoose, app);
    var walkerModel = require("./models/walker.model.js")(mongoose, app);

    require("./services/owner.service.js")(app, ownerModel);
    require("./services/walker.service.js")(app, walkerModel);
};