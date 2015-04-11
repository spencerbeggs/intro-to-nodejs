"use strict";
var _ = require("lodash");
var config = {};

if (process.env.NODE_ENV === "production") {
	_.merge(config, require("./prod"));
}

if (process.env.NODE_ENV === "development") {
	_.merge(config, require("./dev"));
}

module.exports = config;
