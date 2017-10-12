/* eslint no-console: 0*/
"use strict";

const fs = require("fs");
const glob = require("glob");
const path = require("path");

function getFlowTypedFiles(onMatch) {
	const appDirectory = fs.realpathSync(process.cwd());
	const files = glob.sync(path.join(appDirectory, "flow-typed", "*.js"));
	files.forEach(onMatch);
	return files;
}

module.exports = getFlowTypedFiles;
