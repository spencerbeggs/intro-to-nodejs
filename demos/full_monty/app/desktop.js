"use strict";
var config = require("config");
var $ = require("jquery");

$(document).ready(function() {
	console.log(config.app.name + " started");
});
