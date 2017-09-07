"use strict";

const fs = require("fs");
const glob = require("glob");
const path = require("path");
const paths = require("../config/paths");

const appSrc = path.join(paths.currentDirectory, paths.appSrc);
const appBuild = path.join(paths.currentDirectory, "build");

try {
	fs.mkdirSync(appBuild);
} catch (err) {}

function getSrcFiles(onMatch) {
	const files = glob.sync(`${appSrc}/*.js`, {});
	files.forEach(onMatch);
}

module.exports = getSrcFiles;
