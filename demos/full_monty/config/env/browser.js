"use strict";
var _ = {};
_.merge = require("lodash.merge");
var $ = require("jquery");
module.exports = (function() {
	var env = $("html").data("env");
	var config = require("./defaults")();
	var globals = require("./globals")();
	if (env === "dev") {
		_.merge(config, require("./development")(), globals);
	}
	else if (env === "ci") {
		_.merge(config, require("./ci")(), globals);
	}
	else if (env === "stag") {
		_.merge(config, require("./staging")(), globals);
	}
	else if (env === "prod") {
		_.merge(config, require("./production")(), globals);
	}
	config = require("./calculated")(config);
	return config;
})();
