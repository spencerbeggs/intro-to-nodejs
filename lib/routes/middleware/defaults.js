"use strict";
var config = require("../../config");
var pjson = require("../../package.json");

module.exports = function(req, res, next) {
	res.locals = config;
	res.locals.css = {
		head: [],
		body: []
	};
	res.locals.js = {
		head: [],
		body: []
	};
	var suffix = config.env === "dev" ? "" : ".min";
	next();
};
