/* eslint no-console: 0*/
"use strict";

const fs = require("fs");
const path = require("path");

function getLerna() {
	const appDirectory = fs.realpathSync(process.cwd());
	return JSON.parse(fs.readFileSync(path.join(appDirectory, "lerna.json"), "utf8"));
}

module.exports = getLerna;
