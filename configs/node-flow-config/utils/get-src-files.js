"use strict";

const fs = require("fs");
const rimraf = require("rimraf");
const makeDir = require("make-dir");
const glob = require("glob");
const path = require("path");
const paths = require("../config/paths");

const appSrc = paths.appSrc;
const appBuild = path.join(paths.currentDirectory, "build");

try {
	rimraf.sync(appBuild);
	makeDir.sync(appBuild);
} catch (err) {}

function getSrcFiles(onMatch) {
	const files = glob.sync(`${appSrc}/**/*.js`, { ignore: [`${appSrc}/*.spec.js`, `${appSrc}/*.test.js`] });
	files.forEach(onMatch);
}

module.exports = getSrcFiles;
