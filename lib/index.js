"use strict";
var config = require("./config");
console.log("Starting " + config.app.name + " in " + config.enviornment + " mode...");
// Start the local reverse proxy if we are spoofing a domain in the dev env
//if (config.env === "dev" && ["localhost", "127.0.0.1"].indexOf(config.domain) !== -1) {
	var process = require("child_process");
	process.fork("proxy.js", {
		silent: true
	});
//}


// Bring up Express app
require("./server");
