"use strict";
var config = global.config = require("config");
console.log(config.app.name + " started: %O", config);
var $ = require("jquery");
var Backbone = require("backbone");
Backbone.$ = $;
Backbone._ = require("lodash")

$(document).ready(function() {
	console.log(Backbone);
	console.log("jQuery document ready");
});
