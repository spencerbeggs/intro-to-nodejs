var bar = require("./bar");

function delay(time) {
	var d1 = new Date();
	var d2 = new Date();
	while (d2.valueOf() < d1.valueOf() + time) {
		d2 = new Date();
	}
}

for (var i = 0; i < 5; i++) {
	console.log(bar());
	delay(2000);
}