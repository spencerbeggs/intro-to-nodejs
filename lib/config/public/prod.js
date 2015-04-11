"use strict";

var config = {};
config.env = "prod";
config.enviornment = "production";
config.protocol = "http";
config.subdomain = "www";
config.domain = "demo.com";
config.port = 80;
config.is = {
	prod: true,
	production: true
};
config.not = {
	prod: false,
	producation: false
};
module.exports = config;
