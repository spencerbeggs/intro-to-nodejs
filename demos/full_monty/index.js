"use strict";
var config = require("./config/index.js");
var process = require("child_process");

console.log("Starting " + config.app.name + " in " + config.enviornment + " mode...");
if (config.env === "dev") {
	process.fork("proxy.js");
}

require("./server");
