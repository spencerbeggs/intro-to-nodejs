"use strict";
var config = require("config");
var pjson = require("../../package.json");
var minify = require("html-minifier").minify;
var _ = require("lodash");

module.exports = function(req, res, next) {
	if (req.query.config === "") {
		return res.json(require("../../config/browser.js"));
	}
	res.locals.is = config.is;
	res.locals.not = config.not;
	if (res.locals.template) {
		res.render(res.locals.template, function(err, html) {
			var output = minify(html, {
				collapseWhitespace: (config.env !== "dev") ? true : false,
				removeComments: (config.env !== "dev") ? true : false,
				minifyJS: (config.env !== "dev") ? true : false
			});
			res.locals = {};
			res.vary("User-Agent");
			return res.send(output);
		});
	} else {
		return next();
	}
};
