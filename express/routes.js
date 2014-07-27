"use strict";
var express = require("express");
var router = express.Router();

router.get("/barnyard", function(req, res, next) {
	console.log("GET: /");
	res.locals = {
		title: "Test",
		template: "pages/barnyard"
	};
	next();
});

router.use(function(req, res) {
	return res.render(res.locals.template);
});

module.exports = router;
