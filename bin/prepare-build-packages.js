/* eslint no-console: 0*/
/* eslint complexity: 0*/
"use strict";

const fs = require("fs");
const path = require("path");
const makeDir = require("make-dir");
const getLernaPackages = require("./utils/get-lerna-packages");
const getPackage = require("./utils/get-package");

getLernaPackages(packagePath => {
	const packageData = getPackage(packagePath);
	const build = packageData.buildPackage;
	const packageDataCopy = Object.assign({}, packageData);
	if (!packageData.buildPackage) {
		return;
	}
	if (!build.src) {
		console.error("No source directory defined (buildPackage.src)!");
	}
	if (!build.dest) {
		console.error("No destination directory defined (buildPackage.dest)!");
	}
	if (!build.name) {
		console.error("No buildPackage name defined!");
	}
	if (build.name === packageData.name) {
		console.error("The buildPackage name couldn't be the same as the package name!");
	}

	makeDir.sync(path.join(packagePath, build.dest));

	packageDataCopy.name = build.name;
	delete packageDataCopy.buildPackage;
	if (build.ignore) {
		build.ignore.forEach(ignoreAttr => {
			delete packageDataCopy[ignoreAttr];
		});
	}

	const targetFile = path.join(packagePath, build.dest, "package.json");
	makeDir.sync(path.join(packagePath, build.dest, "node_modules"));
	fs.writeFileSync(targetFile, JSON.stringify(packageDataCopy, null, 4));
	console.log(`wrote file ${targetFile}`);
});
