"use strict";
var pjson = require("../package.json");
var config = require("config");
var express = require("express");
var router = express.Router();
var _ = require("lodash");

router.use(function(req, res, next) {
	_.merge(res.locals, config);
	next();
});

router.get("/", function(req, res, next) {
	console.log("GET: /");
	var suffix = "-" + pjson.version;
	if (config.is.prod) {
		suffix += ".min";
	}
	res.locals.css = config.url + "/css/desktop" + suffix + ".css";
	res.locals.js = config.url + "/js/desktop" + suffix + ".js";
	res.locals.pageId = "home";
	res.locals.template = "pages/home";
	next();
});

router.use(require("./middleware/render.js"));

module.exports = router;
