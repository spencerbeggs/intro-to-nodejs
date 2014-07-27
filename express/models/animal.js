"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var timestamps = require("mongoose-times");

var AnimalSchema = new Schema({
	name: String,
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

module.exports = mongoose.model("Animal", AnimalSchema);
