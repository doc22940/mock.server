"use strict";

const fs = require("fs");
const path = require("path");
const paths = require("../config/paths");
const babel = require("babel-core");
const babelTransformOptions = require("../config/babel-transform-options");

process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

const appBuild = path.join(paths.currentDirectory, "build");

function babelify(file) {
	const fileName = path.basename(file);

	try {
		const result = babel.transformFileSync(file, babelTransformOptions);
		fs.writeFileSync(path.join(appBuild, fileName), result.code);
		console.log(`wrote file ${file}`);
	} catch (err) {
		console.error(err);
	}
}

module.exports = babelify;
