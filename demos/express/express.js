"use strict";
var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express3-handlebars");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");
var compression = require("compression");
var MongoStore = require("connect-mongostore")(session);
var passport = require("./passport");

var app = express();
// Because you're the type of developer who cares about this sort of thing
app.enable("strict routing");
app.set("showStackError", true);

// set the view engine to use handlebars
app.set("views", __dirname + "/templates");
app.engine("hbs", exphbs({
	extname: ".hbs",
	layoutsDir: __dirname + "/templates/layouts",
	partialsDir: [
		__dirname + "/templates/partials",
	],
	defaultLayout: "default",
	helpers: {
		encode: function(text) {
			return encodeURIComponent(text);
		}

	}
}));
app.set("view engine", ".hbs");
app.use(compression());
app.use("/js", express.static(__dirname + "/public/js"));
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/images", express.static(__dirname + "/public/images"));
app.use("/fonts", express.static(__dirname + "/public/fonts"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(session({
	secret: "iamasecret",
	store: new MongoStore({
		db: "nodejitsudb4317056101",
		collection: "sessions",
		mongooseConnection: mongoose.connections[0]
	}),
	cookie: {
		maxAge: null, //config.express.cookie.maxAge,
		domain: null
	}
}));
app.use(passport.initialize());
app.use(passport.session());

module.exports = app;
