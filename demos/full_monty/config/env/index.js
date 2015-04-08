"use strict";
var _ = {};
_.merge = require("lodash.merge");

module.exports = (function(env) {
	var config = require("./defaults")();
	var globals = require("./globals")();
	var secret = require("./secret");
	var enviornment;
	if (env) {
		enviornment = env;
	} else if (typeof process.env.NODE_ENV !== "undefined") {
		enviornment = process.env.NODE_ENV;
	} else {
		enviornment = "development";
	}
	if (enviornment === "development") {
		var development = require("./development")();
		_.merge(config, development, secret, globals);
	} else if (enviornment === "production") {
		var production = require("./production")();
		_.merge(config, production, secret, globals);
	}
	config = require("./calculated")(config);
	return config;
})();
