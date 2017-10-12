"use strict";

function getCopyFiles(onMatch) {
	const files = [];
	let hasFileArgFound = false;

	process.argv.forEach(entry => {
		if (hasFileArgFound) {
			files.push(entry);
		}
		if (entry === "--files") {
			hasFileArgFound = true;
		}
	});

	files.forEach(onMatch);
}

module.exports = getCopyFiles;
