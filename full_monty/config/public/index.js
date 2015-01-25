"use strict";
var _ = require("lodash");
var config = {};

if (process.env.NODE_ENV === "production") {
	_.merge(config, require("./prod"));
}

if (process.env.NODE_ENV === "development") {
	_.merge(config, require("./dev"));
}

config.url = config.protocol + "://" + ((config.subdomain) ? config.subdomain + "." : "") + config.domain + ((config.port !== 443 && config.port !== 7070) ? ":" + config.port : "");

module.exports = config;
