"use strict";
var config = require("./env")();
var passport = require("passport");
var mongoose = require("mongoose");
var User = mongoose.model("User");
var LocalStrategy = require("passport-local").Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;
var DwollaStrategy = require("passport-dwolla").Strategy;

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
			} else {
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
		} else {
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
			} else {
				console.log("passwords incorrect");
				return done(null, false, {
					message: "Invalid password"
				});
			}
		});
	});
}));

// Use the DwollaStrategy within Passport.
// Strategies in Passport require a `verify` function, which accept
// credentials (in this case, an accessToken, refreshToken, and Dwolla
// profile), and invoke a callback with a user object.
passport.use(new DwollaStrategy({
		clientID: config.dwolla.key,
		clientSecret: config.dwolla.secret,
		callbackURL: config.url + "/auth/dwolla/callback",
		passReqToCallback: true
	},
	function(req, accessToken, refreshToken, profile, done) {
		// asynchronous verification, for effect...
		process.nextTick(function() {
			if (!req.user) {
				console.log("no user");
				// Not logged-in. Authenticate based on Twitter account.
				//console.log(profile);
			} else {
				// Logged in. Associate Twitter account with user.  Preserve the login
				// state by supplying the existing user after association.
				// return done(null, req.user);
				req.user.dwolla = accessToken;
				req.user.save(function(err, savedUser) {
					if (err) {
						console.log(err);
					}
					if (savedUser) {
						// console.log("Saved Dwolla token");
						return done(null, savedUser);
					}
				});
			}
		});
	}
));

// Facebook authorization
passport.use(
	new FacebookStrategy({
		clientID: config.facebook.appId,
		clientSecret: config.facebook.appSecret,
		callbackURL: config.facebook.callbackUrl
	}, function(accessToken, refreshToken, profile, done) {
		User.findOne({
			"facebook.id": profile.id
		}, function(err, user) {
			if (err) {
				return done(err);
			}
			if (!user) {
				user = new User({
					name: profile.displayName,
					email: profile.emails[0].value,
					username: profile.username,
					provider: "facebook",
					facebook: profile._json
				});
				user.save(function(err) {
					if (err) {
						console.log(err);
						return (err);
					}
					return done(null, user);
				});
			} else {
				return done(null, user);
			}
		});
	})
);

module.exports = passport;
