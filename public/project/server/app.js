"use strict";

module.exports = function(app, mongoose, db) {
    var ownerModel = require("./models/owner/owner.model.js")(mongoose, app);
    var walkerModel = require("./models/walker/walker.model.js")(mongoose, app);
    var apptModel = require("./models/appt/appt.model.js")(mongoose, app);

    require("./services/owner.service.js")(app, ownerModel);
    require("./services/walker.service.js")(app, walkerModel);
    require("./services/appt.service.js")(app, apptModel);
    require("./services/review.service.js")(app, walkerModel, ownerModel);
};