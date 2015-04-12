var connect = "mongodb://104.236.204.157:27017/farm";
var mongojs = require("mongojs");
var db = mongojs(connect, ["animals"]);

db.animals.find({
	weight: {
		$gt: 40
	}
}, function(err, docs) {
	console.log(docs);
});