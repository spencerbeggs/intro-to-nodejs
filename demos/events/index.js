var EventEmitter = require("events").EventEmitter;
var util = require("util");

function Dog(name) {
	var self = this;
	// call the super constructor to initialize `this`
	EventEmitter.call(this);
	this.name = name;
	this.bark = function() {
		console.log(self.name + ": bark!");
	};
	setInterval(function() {
		self.bark();
		self.emit("bark");
	}, 2000);
}

util.inherits(Dog, EventEmitter);

var petey = new Dog("Petey");
var fluffy = new Dog("Fluffy");

petey.on("bark", function() {
	console.log("Quiet, Petey!");
});