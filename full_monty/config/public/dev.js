"use strict";

var config = {};
config.env = "dev";
config.enviornment = "development";
config.protocol = "http";
config.subdomain = "local";
config.domain = "fullmonty.com";
config.port = 3000;
config.is = {
	dev: true,
	development: true
};
config.not = {
	dev: false,
	development: false
};
module.exports = config;
