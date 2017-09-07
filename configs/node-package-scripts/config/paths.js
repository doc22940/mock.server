"use strict";

const path = require("path");
const fs = require("fs");
const url = require("url");

const currentDirectory = fs.realpathSync(process.cwd());

function resolveCurrent(relativePath) {
	return path.resolve(currentDirectory, relativePath);
}

module.exports = {
	currentDirectory,
	dotEnv: resolveCurrent("/.env"),
	appSrc: resolveCurrent("/src"),
	appPackageJson: resolveCurrent("package.json"),
	testsSetup: resolveCurrent("/__tests__/setup.js")
};
