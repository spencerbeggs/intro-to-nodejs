var EventEmitter = require("events").EventEmitter;
var util = require("util");
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding("utf8");

function Dog(name) {
	var self = this;
	// call the super constructor to initialize `this`
	EventEmitter.call(this);
	this.name = name;
	this.bark = function() {
		console.log(self.name + ": bark!");
	};
	stdin.on("data", function(key) {
		if (key === "j") {
			self.bark();
		}
		else if (key == "q") {
			process.kill(0);
		}
		else {
			process.stdout.write(key);
		}
	});
}

util.inherits(Dog, EventEmitter);

var petey = new Dog("Petey");
//var fluffy = new Dog("Fluffy");

// petey.on("bark", function(data) {
// 	console.log("Quiet, Petey!");
// });