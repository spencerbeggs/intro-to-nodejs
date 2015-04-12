"use strict";
var _ = require("lodash");
var pjson = require("../../package.json");

var config = {};
config.app = {
	name: "Intro to Node.JS",
	description: pjson.description,
	slug: "app"
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
config.publicPort = [80, 443].indexOf(config.port) === -1 ? ":" + config.port : "";
config.url = config.protocol + "://" + config.hostname + config.publicPort;

module.exports = config;