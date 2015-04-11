"use strict";
var http = require("http");
var config = require("./config");
var pjson = require("./package.json");
var _ = require("lodash");
var express = require("express");
var exphbs = require("express-handlebars");
var device = require("express-device");
var hbs = exphbs.create({
	extname: ".hbs",
	layoutsDir: __dirname + "/templates/layouts",
	partialsDir: [
		__dirname + "/templates/partials"
	],
	defaultLayout: "default"
});
var favicon = require("serve-favicon");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var compression = require("compression");
var app = express();
app.use(compression());
app.use(favicon(__dirname + "/public/images/favicon.ico"));
if (config.is.dev) {
	app.set("showStackError", true);
}
// set the view engine to use handlebars
app.set("views", __dirname + "/templates");
app.engine("hbs", hbs.engine);
app.set("view engine", ".hbs");
if (config.is.dev) {
	app.use("/browser-sync", express.static(__dirname + "/node_modules/browser-sync/node_modules/browser-sync-client/dist"));
}
app.use("/js", express.static(__dirname + "/public/js"));
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/images", express.static(__dirname + "/public/images"));
app.use(device.capture());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
device.enableDeviceHelpers(app);

// setup routes
require("./routes")(app);

var server = http.createServer(app);
server.listen(config.port, function() {
	console.log(config.app.name + " listening on " + config.url + " (" + config.port + ")");
});
