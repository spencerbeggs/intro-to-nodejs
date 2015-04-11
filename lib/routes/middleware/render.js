"use strict";
var config = require("../../config");
var minify = require("html-minifier").minify;
var html = require("html");

module.exports = function(req, res, next) {
	if (config.env === "dev") {
		if (config.browserSync) {
			res.locals.js.body.push({
				url: "http://" + config.hostname + ":5000/browser-sync/browser-sync-client.2.4.0.js",
				async: true
			});
		}
	}
	if (res.locals.template) {
		res.render(res.locals.template, {
			helpers: {

			}
		}, function(err, htmlText) {
			if (err) {
				console.log(err);
			}
			var output;
			if (config.env !== "dev") {
				output = minify(htmlText, {
					collapseWhitespace: true,
					removeComments: true,
					minifyJS: true
				});
			} else {
				output = html.prettyPrint(htmlText, {
					indent_size: 4,
					max_char: 0
				});
			}

			res.locals = {};
			return res.send(output);
		});
	} else {
		return next();
	}
};
