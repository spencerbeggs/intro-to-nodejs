function randomPerson() {
	var people = ["Tom", "Susan", "Jane"];
	return people[Math.floor(Math.random() * people.length)];
}

function randomStyle() {
	var styles = ["rare", "medium", "well done"];
	return styles[Math.floor(Math.random() * styles.length)];
}

function orderBurger() {
	var person = randomPerson();
	var style = randomStyle();
	var cookingTime;
	if (style === "well done") {
		cookingTime = 7000;
	}
	else if (style === "medium") {
		cookingTime = 5000;
	}
	else if (style === "rare") {
		cookingTime = 2500;
	}
	console.log(person + " ordered a " + style + " burger.");
	setTimeout(function() {
		console.log(person + " got a " + style + " burger.");
	}, cookingTime);
}

orderBurger();
orderBurger();
orderBurger();
console.log("Lunch rush is over.");