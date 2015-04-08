"use strict";

var config = {};
config.env = "prod";
config.enviornment = "production";
config.protocol = "http";
config.domain = "fullmonty.com";
config.port = 3000;
config.is = {
	prod: true,
	production: true
};
config.not = {
	prod: false,
	producation: false
};
module.exports = config;
