"use strict";
var _ = {};
_.merge = require("lodash.merge");

var config = require("./defaults");
var globals = require("./globals");
var enviornment;
if (typeof process.env.NODE_ENV !== "undefined") {
	enviornment = process.env.NODE_ENV;
}
else {
	enviornment = "development";
}
if (enviornment === "development") {
	var development = require("./development");
	_.merge(config, development, globals);
}
else if (enviornment === "ci") {
	var ci = require("./ci");
	_.merge(config, ci, globals);
}
else if (enviornment === "staging") {
	var staging = require("./staging");
	_.merge(config, staging, globals);
}
else if (enviornment === "production") {
	var production = require("./production");
	_.merge(config, production, globals);
}
module.exports = config;
