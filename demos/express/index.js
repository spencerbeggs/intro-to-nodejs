"use strict";
var config = require("./config");
var http = require("http");
var mongoose = require("mongoose");

// connect to the database
mongoose.set("debug", true);
mongoose.connect(config.mongo);
var db = mongoose.connection;

//open for business as soon as we are connected to the database
db.on("open", function() {
	// create Express app
	require("./tools/models")();
	var app = require("./express");
	app.use(require("./routes"));
	http.createServer(app).listen(3000, function() {
		console.log("Listening on http://localhost:3000");
	});
});

db.on("connecting", function() {
	console.log("connecting to MongoDB...");
});

db.on("connected", function() {
	console.log("MongoDB connected!");
	console.log(config.mongo.connect);
});

db.on("reconnected", function() {
	console.log("MongoDB reconnected!");
});

db.on("disconnected", function() {
	console.log("MongoDB disconnected!");
	mongoose.connect(config.mongo.connect, {
		server: {
			auto_reconnect: true
		}
	});
});

//handle db error
db.on("error", function() {
	console.log("Couldn't connect to the database.");
	mongoose.disconnect();
});
