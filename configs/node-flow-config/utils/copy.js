/* eslint no-empty: 0*/
"use strict";

const makeDir = require("make-dir");
const fs = require("fs");
const path = require("path");
const paths = require("../config/paths");
const print = require("./print");

const currentDirectory = paths.currentDirectory;
const appBuild = path.join(paths.currentDirectory, "build");

try {
	makeDir.sync(appBuild);
} catch (err) {}

function copy(file) {
	const sourceFilePath = path.join(currentDirectory, file);
	const targetFilePath = path.join(appBuild, file);
	const data = fs.readFileSync(sourceFilePath, "utf8");
	fs.writeFileSync(targetFilePath, data);
	print.log(`wrote file ${targetFilePath.replace(currentDirectory, "")}`);
}

module.exports = copy;
