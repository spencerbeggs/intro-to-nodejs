function randomPerson() {
	var people = ["Tom", "Susan", "Jane"];
	return people[Math.floor(Math.random() * people.length)];
}

function randomStyle() {
	var styles = ["tuna", "salmon", "mackerel"];
	return styles[Math.floor(Math.random() * styles.length)];
}

function delay(time) {
	var d1 = new Date();
	var d2 = new Date();
	while (d2.valueOf() < d1.valueOf() + time) {
		d2 = new Date();
	}
}

function omakase() {
	var time;
	var person = randomPerson();
	var sushi = randomStyle();
	if (sushi === "tuna") {
		time = 5000;
	}
	else if (sushi === "salmon") {
		time = 3000;
	}
	else if (sushi === "mackerel") {
		time = 1000;
	}
	console.log(person + " ordered a " + sushi + " roll.");
	delay(time);
	console.log(person + " got a " + sushi + " roll.");
}

omakase();
omakase();
omakase();
console.log("Lunch rush is over.");