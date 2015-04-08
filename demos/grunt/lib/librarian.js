/**
 * Represents a librarian.
 * @constructor
 * @param {string} name - The name of the librarian.
 * @param {array} schedule - An array of days when the librarian works.
 */
function Librarian(name, schedule) {
	this.name = name;
	this.schedule = schedule;
	return this;
}

module.exports = Librarian;
