/* global __dirname, require, module */
/* eslint complexity: 0*/
/* eslint no-console: 0*/
"use strict";

const path = require("path");
const fs = require("fs");
const makeDir = require("make-dir");

const flowFile = path.join(__dirname, "/../../spectre-ui.js.flow");
const dir = path.join(__dirname, "/../../stories");

function normalizeLine(line) {
	line = line.trim().replace(/\t/g, "");
	if (line.search(/,$/) < 0) {
		line += ",";
	}
	return line;
}

function extract() {
	const fileData = fs.readFileSync(flowFile, "utf8");
	const reg = new RegExp("export type ([^ =]*) = ([^;]*);", "g");
	let results;
	const types = {};

	// eslint-disable-next-line
	while ((results = reg.exec(fileData)) !== null) {
		const type = { name: results[1], type: undefined, value: undefined, values: undefined, desc: undefined };

		// leading " means it is an string enum
		if (results[2].search(/^"/) === 0) {
			type.type = "string (enum)";
			type.value = results[2];
		} else if (results[2].search(/^{/) === 0 || results[2].search(/}$/) > 0) {
			// leading " means it is an object
			const lines = results[2].split("\n");
			type.type = "object";
			type.values = [];
			lines.splice(0, 1);
			lines.splice(lines.length - 1, 1);
			lines.forEach(line => {
				line = normalizeLine(line);
				// eslint-disable-next-line
				const regLine = new RegExp(`^([a-zA-Z0-9_]*)([\?]?): ([^,]*),`);
				const resultLine = regLine.exec(line);

				type.values.push({
					name: resultLine[1],
					type: resultLine[3],
					required: resultLine[2] !== "?"
				});
			});
		} else {
			type.type = "any";
			type.value = results[2];
		}

		types[results[1]] = type;
	}

	const target = path.join(dir, "/tmp");
	const targetFile = path.join(target, "/types.js");
	makeDir.sync(target);
	fs.writeFileSync(targetFile, ["export default ", JSON.stringify(types, null, 2), ";"].join(""));
	console.log("wrote file: ", targetFile);
}

function watch() {
	extract();
	fs.watchFile(flowFile, () => {
		extract();
	});
}

module.exports = {
	extract,
	watch
};
