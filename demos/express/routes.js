"use strict";
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Animal = mongoose.model("Animal");
var async = require("async");

router.get("/barnyard", function(req, res, next) {
	console.log("GET: /bardyard");
	res.locals = {
		title: "Barnyard",
		template: "pages/barnyard"
	};
	Animal.find(function(err, animals) {
		if (err) {
			console.log(err);
		}
		res.locals.animals = animals;
		next();
	});
});

router.post("/kill", function(req, res) {
	console.log(req.body);
	Animal.findOne({
		"_id": req.body.animal
	}, function(err, animal) {
		animal.remove(function(err, killedAnimal) {
			if (err) {
				console.log(err);
				return res.send(500);
			}
			else {
				return res.send(200);
			}
		});
	});
});

router.get("/async", function(req, res, next) {
	async.parallel({
		cow: function(callback) {
			Animal.find({
				"type": "cow"
			}, function(err, cows) {
				if (err) {
					console.log(err);
					return callback(err);
				}
				callback(null, cows);
			});
		},
		chicken: function(callback) {
			Animal.find({
				"type": "chicken"
			}, function(err, cows) {
				if (err) {
					console.log(err);
					return callback(err);
				}
				callback(null, cows);
			});
		},
		pig: function(callback) {
			Animal.find({
				"type": "pig"
			}, function(err, cows) {
				if (err) {
					console.log(err);
					return callback(err);
				}
				callback(null, cows);
			});
		}
	}, function(err, results) {
		console.log("There are " + results.cow.length + " cows");
		console.log("There are " + results.chicken.length + "chickens");
		console.log("There are " + results.pig.length + "pigs");
	});
});

router.get("/barnyard/:kind", function(req, res, next) {
	console.log("GET: /bardyard/kind");
	res.locals = {
		title: "Kind",
		template: "pages/barnyard"
	};
	next();
});

router.use(function(req, res) {
	return res.render(res.locals.template);
});

router.param("kind", function(req, res, next, kind) {
	Animal.find({
		"type": "cow"
	}, function(err, animals) {
		res.animals = animals;
		next();
	});
});

module.exports = router;
