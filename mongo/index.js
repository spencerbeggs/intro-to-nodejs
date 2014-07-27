var connect = "mongodb://nodejitsu:5ea0438be419e2350db3b2f6d9add55a@troup.mongohq.com:10019/nodejitsudb4317056101";
var mongojs = require("mongojs");
var db = mongojs(connect, ["animals", "people"]);
