function delay(time) {
	var d1 = new Date();
	var d2 = new Date();
	while (d2.valueOf() < d1.valueOf() + time) {
		d2 = new Date();
	}
}

function omakase(kind) {
	var time;
	var fish = ["tuna", "salmon", "mackerel"];
	var sushi = kind ? kind : fish[Math.floor(Math.random() * fish.length)];
	if (sushi === "tuna") {
		time = 5000;
	}
	else if (sushi === "salmon") {
		time = 3000;
	}
	else if (sushi === "mackerel") {
		time = 1000;
	}
	delay(time);
	return sushi;
}

console.log("Doug got " + omakase());
console.log("Mary got " + omakase());
