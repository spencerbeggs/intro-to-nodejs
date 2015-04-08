module.exports = function(grunt) {
	var tasks = {};
	tasks.jsdoc = {
		dist: {
			src: ["lib/*.js"],
			options: {
				destination: "doc"
			}
		}
	};
	tasks.browserify = {
		app: {
			files: {
				"public/js/library.js": [
					"app/index.js"
				]
			},
			options: {
				browserifyOptions: {
					debug: true
				}
			}
		}
	};

	tasks.less = {
		town: {
			options: {
				sourceMap: true
			},
			files: {
				"public/css/town.css": ["less/town.less"]
			}
		},
		prod: {
			options: {
				sourceMap: false
			},
			files: {
				"public/css/prod.css": ["less/library.less", "less/book.less"]
			}
		}
	};

	// Load Grunt plugins
	grunt.loadNpmTasks("grunt-browserify");
	grunt.loadNpmTasks("assemble-less");
	grunt.loadNpmTasks("grunt-jsdoc");

	// Grunt tasks
	grunt.registerTask("documentation", ["jsdoc"]);

	grunt.initConfig(tasks);
};
