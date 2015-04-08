"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var timestamps = require("mongoose-times");

var AnimalSchema = new Schema({
	name: String,
	type: String,
	weight: Number
}, {
	toObject: {
		virtuals: true
	},
	toJSON: {
		virtuals: true
	}
});

AnimalSchema.plugin(timestamps);

AnimalSchema.virtual("isPig").get(function() {
	if (this.type === "pig") {
		return true;
	}
	else {
		return false;
	}
});

module.exports = mongoose.model("Animal", AnimalSchema);
