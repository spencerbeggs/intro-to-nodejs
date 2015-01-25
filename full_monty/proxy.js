"use strict";

var config = require("./config/index.js");
var http = require("http");
var proxy = require("dynamic-reverse-proxy")();

var server = http.createServer();

server.on("request", function(req, res) {
	if (req.url.match(/^\/register/i)) {
		proxy.registerRouteRequest(req, res);
	} else {
		proxy.proxyRequest(req, res);
	}
});

proxy.addRoutes({
	app: {
		"prefix": "/",
		"host": config.hostname,
		"port": config.port
	}
});

server.listen(config.proxy.port, function() {
	console.log(config.app.name + " proxy listening on port " + config.proxy.port);
	console.log("passing traffic to " + config.hostname + " to 127.0.0.1:" + config.port);
	console.log("make sure the following line needs to be in /etc/hosts: ");
	console.log("rdr pass on lo0 inet proto tcp from any to any port 80 -> 127.0.0.1 port " + config.proxy.port);
});

module.exports = server;
