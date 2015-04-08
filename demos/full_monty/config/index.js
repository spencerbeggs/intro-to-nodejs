"use strict";
var _ = require("lodash");

var config = {};
config.app = {
	name: "The Full Monty"
};
config.env = "unknown";
config.enviornment = "unknown";
config.is = {
	dev: false,
	development: false,
	prod: false,
	production: false
};
config.not = {
	dev: true,
	development: true,
	prod: true,
	production: true
};

_.merge(config, require("./public"));

if (typeof window === "undefined") {
	_.merge(config, require("./secret"));
}

config.hostname = config.subdomain ? config.subdomain + "." + config.domain : "" + config.domain;
config.url = config.protocol + "://" + config.hostname + ((config.port !== 3000 && config.port !== 443 && config.port !== 80) ? ":" + config.port : "");
if (config.mongo) {
	config.mongo.connect = "mongodb://" + ((config.mongo.un) ? config.mongo.un + ":" : "") + ((config.mongo.pw) ? config.mongo.pw + "@" : "") + config.mongo.url + "/" + config.mongo.db;
}

module.exports = config;
