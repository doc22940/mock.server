/* eslint no-console: 0*/
"use strict";

const fs = require("fs");
const path = require("path");

function getPackage(pathToPackage) {
	return JSON.parse(fs.readFileSync(path.join(pathToPackage, "package.json"), "utf8"));
}

module.exports = getPackage;
