"use strict";
var express = require("express");
var router = express.Router();
var _ = require("lodash");

router.get("/latest", function(req, res, next) {
	res.locals.pageId = "latest";
	res.locals.template = "pages/home";
	next();
});

router.get("/last", function(req, res, next) {
	res.locals.pageId = "latest";
	res.locals.template = "pages/home";
	next();
});


module.exports = router;
