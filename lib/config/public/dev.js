"use strict";

var config = {};
config.app = {
	name: "Foo",
	description: "bar",
	slug: "baz"
}
config.env = "dev";
config.enviornment = "development";
config.protocol = "http";
config.domain = "localhost";
config.port = 3000;
config.browserSync = true;
config.is = {
	dev: true,
	development: true
};
config.not = {
	dev: false,
	development: false
};
module.exports = config;
