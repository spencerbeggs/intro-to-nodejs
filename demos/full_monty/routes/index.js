"use strict";

module.exports = function(app) {
	app.use(require("./pages"));
	app.use(function(req, res) {
		res.render("pages/404");
	});
};
