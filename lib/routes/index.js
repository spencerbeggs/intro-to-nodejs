"use strict";
var middleware = require("./middleware");

module.exports = function(app) {
	app.use(middleware.logger);
	app.use(middleware.defaults);
	app.use(require("./pages"));
	app.use("/api", require("./api"));
	app.use(middleware.render);
};
