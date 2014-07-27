"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");
var saltWorkFactor = 10;
var maxLoginAttempts = 10;
var lockTime = 2 * 60 * 60 * 1000;
var timestamps = require("mongoose-times");

var SearchSchema = new Schema({
	"for": [String],
	that: [String],
	from: [String],
	min: Number,
	max: Number
}, {
	toObject: {
		virtuals: true
	},
	toJSON: {
		virtuals: true
	}
});

SearchSchema.plugin(timestamps);

var definition = {
	name: {
		type: String
	},
	email: [{
		type: String,
		required: true,
		unique: true
	}],
	username: {
		type: String
	},
	password: {
		type: String,
		required: true
	},
	accessToken: {
		type: String
	},
	role: {
		type: String,
		default: "user"
	},
	loginAttempts: {
		type: Number,
		required: true,
		default: 0
	},
	lockUntil: {
		type: Number
	}
};

var UserSchema = new Schema(definition, {
	collection: "user",
	toObject: {
		virtuals: true
	},
	toJSON: {
		virtuals: true
	}
});

UserSchema.plugin(timestamps);

UserSchema.virtual("firstName").get(function() {
	if (this.name) {
		return this.name.split(" ")[0];
	}
});

// virtual attributes
UserSchema.virtual("isLocked").get(function() {
	// check for a future lockUntil timestamp
	return !!(this.lockUntil && this.lockUntil > Date.now());
});

UserSchema.virtual("isAdmin").get(function() {
	// check for a future lockUntil timestamp
	return (this.role === "admin");
});

UserSchema.virtual("isUser").get(function() {
	// check for a future lockUntil timestamp
	return (this.role === "user");
});

UserSchema.pre("save", function(next) {
	var user = this;
	//only hash the password if it has been modified or is new
	if (!user.isModified("password")) {
		return next();
	}
	//generate salt
	bcrypt.genSalt(saltWorkFactor, function(err, salt) {
		if (err) {
			return next(err);
		}
		//hash the password with the salt
		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) {
				return next(err);
			}
			//set the hashed password back on our user document
			user.password = hash;
			next();
		});
	});
});

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
	console.log(this.password);
	var user = this;
	bcrypt.compare(candidatePassword, user.password, function(err, isMatch) {
		if (err) {
			return callback(err);
		}
		if (!isMatch) {
			console.log("passwords didn't match");
			console.log(candidatePassword);
			console.log(user.password);
		}
		callback(null, isMatch);
	});
};

// Remember Me implementation helper method
UserSchema.methods.generateRandomToken = function() {
	var chars = "_!abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
	var token = new Date().getTime() + "_";
	for (var x = 0; x < 16; x++) {
		var i = Math.floor(Math.random() * 62);
		token += chars.charAt(i);
	}
	return token;
};

UserSchema.methods.incLoginAttempts = function(callback) {
	// if we have a previous lock that has expired, restart at 1
	if (this.lockUntil && this.lockUntil < Date.now()) {
		return this.update({
			$set: {
				loginAttempts: 1
			},
			$unset: {
				lockUntil: 1
			}
		}, callback);
	}
	// otherwise we"re incrementing
	var updates = {
		$inc: {
			loginAttempts: 1
		}
	};
	// lock the account if we"ve reached max attempts and it"s not locked already
	if (this.loginAttempts + 1 >= maxLoginAttempts && !this.isLocked) {
		updates.$set = {
			lockUntil: Date.now() + lockTime
		};
	}
	return this.update(updates, callback);
};

// expose enum on the model, and provide an internal convenience reference
var reasons = UserSchema.statics.failedLogin = {
	notFound: 0,
	passwordIncorrect: 1,
	maxAttempts: 2
};

UserSchema.statics.getAuthenticated = function(email, password, callback) {
	this.findOne({
		email: email
	}).exec(function(err, user) {
		if (err) {
			return callback(err);
		}
		// make sure the user exists
		if (!user) {
			console.log("no user found found with that e-mail");
			return callback(null, null, reasons.notFound);
		}

		// check if the account is currently locked
		if (user.isLocked) {
			if (user.lockUntil > Date.now()) {
				// just increment login attempts if account is already locked
				return user.incLoginAttempts(function(err) {
					if (err) {
						return callback(err);
					}
					console.log("incrementing loging attempts");
					return callback(null, null, reasons.maxAttempts);
				});
			}
		}

		// test for a matching password
		user.comparePassword(password, function(err, isMatch) {
			if (err) {
				return callback(err);
			}

			// check if the password was a match
			if (isMatch) {
				// if there"s no lock or failed attempts, just return the user
				if (!user.loginAttempts && !user.lockUntil) {
					return callback(null, user);
				}
				// reset attempts and lock info
				var updates = {
					$set: {
						loginAttempts: 0
					},
					$unset: {
						lockUntil: 1
					}
				};
				return user.update(updates, function(err) {
					if (err) {
						return callback(err);
					}
					return callback(null, user);
				});
			}

			// password is incorrect, so increment login attempts before responding
			user.incLoginAttempts(function(err) {
				if (err) {
					return callback(err);
				}
				return callback(null, null, reasons.passwordIncorrect);
			});
		});
	});
};

module.exports = mongoose.model("User", UserSchema);
