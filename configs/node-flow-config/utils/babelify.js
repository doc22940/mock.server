"use strict";

const fs = require("fs");
const path = require("path");
const makeDir = require("make-dir");
const babel = require("babel-core");
const paths = require("../config/paths");
const babelTransformOptions = require("../config/babel-transform-options");

process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

const appBuild = path.join(paths.currentDirectory, "build");

function babelify(file) {
	try {
		const result = babel.transformFileSync(file, babelTransformOptions);
		const target = file.replace("/src/", "/build/");
		const fileName = path.basename(file);
		makeDir.sync(target.replace(fileName, ""));
		fs.writeFileSync(target, result.code);
		const date = new Date();
		const dateF = `${date.toLocaleTimeString()}`;
		console.log(`[${dateF}] ${require(paths.appPackageJson).name}${file.replace(paths.currentDirectory, "")}`);
	} catch (err) {
		console.error(err);
	}
}

module.exports = babelify;
