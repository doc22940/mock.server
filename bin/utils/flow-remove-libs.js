/* eslint no-console: 0*/
"use strict";

const fs = require("fs");

function flowRemoveLibs(file) {
	let argPath;
	let argPathFound = false;

	process.argv.forEach(argv => {
		if (argPathFound) {
			argPath = argv;
		}
		if (argv === "--path") {
			argPathFound = true;
		}
	});

	if (!argPath) {
		console.error("flow-remove-libs require --path");
	}

	const fileData = fs.readFileSync(file, "utf8");
	fs.writeFileSync(file, fileData.replace(`${argPath}\n`, ""));
}

module.exports = flowRemoveLibs;
