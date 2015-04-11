"use strict";
var express = require("express");
var router = express.Router();
var _ = require("lodash");
var pjson = require("../package.json");
var config = require("../config");
var suffix = config.env === "prod" ? ".min" : "";

router.get("/", function(req, res, next) {
	res.locals.content = {
		title: "This is the Homepage",
		description: "This is the description"
	};
	res.locals.pageId = "home";
	res.locals.template = "pages/home";
	next();
});

router.get("/react", function(req, res, next) {
	res.locals.css.head.push({
		url: "/css/react-" + pjson.version + suffix + ".css",
	});
	res.locals.js.body.push({
		url: "/js/react-" + pjson.version + suffix + ".js",
		async: true
	});
	res.locals.pageId = "react";
	res.locals.template = "pages/home";
	next();
});

router.get("/three", function(req, res, next) {
	res.locals.pageId = "three";
	res.locals.template = "pages/two";

	next();
});

module.exports = router;
