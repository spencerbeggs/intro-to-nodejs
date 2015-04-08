"use strict";
var passport = require("passport");
var mongoose = require("mongoose");
var User = mongoose.model("User");
var LocalStrategy = require("passport-local").Strategy;

// serialize sessions
passport.serializeUser(function(user, done) {
	//console.log("serializing: " + user.id);
	var createAccessToken = function() {
		var token = user.generateRandomToken();
		User.findOne({
			accessToken: token
		}, function(err, existingUser) {
			if (err) {
				return done(err);
			}
			if (existingUser) {
				createAccessToken(); // Run the function again - the token has to be unique!
			}
			else {
				user.set("accessToken", token);
				user.save(function(err) {
					if (err) {
						return done(err);
					}
					//console.log("user serialized");
					return done(null, user.get("accessToken"));
				});
			}
		});
	};
	if (user._id) {
		createAccessToken();
	}
});

// deserialize sessions
passport.deserializeUser(function(token, done) {
	User.findOne({
		accessToken: token
	}, function(err, user) {
		if (user) {
			//console.log("deserializing: " + user._id);
			done(err, user);
		}
		else {
			console.log("could not find user to deserialize");
			done(err, null);
		}
	});
});

// local authorization
passport.use(new LocalStrategy({
	usernameField: "email"
}, function(username, password, done) {
	User.findOne({
		email: {
			$in: [username]
		}
	}, function(err, user) {
		if (err) {
			return done(err);
		}
		if (!user) {
			console.log("no user: " + username);
			return done(null, false, {
				message: "Incorrect username."
			});
		}
		user.comparePassword(password, function(err, isMatch) {
			if (err) {
				return done(err);
			}
			if (isMatch) {
				console.log("passwords match");
				return done(null, user);
			}
			else {
				console.log("passwords incorrect");
				return done(null, false, {
					message: "Invalid password"
				});
			}
		});
	});
}));

module.exports = passport;
