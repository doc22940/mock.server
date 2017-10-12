/* eslint no-empty: 0*/
/* eslint complexity: 0*/
"use strict";

const getPackage = require("./get-package");
const print = require("./print");

function getBuildPackage() {
	const packageData = getPackage();
	const build = packageData.buildPackage;
	if (!packageData.buildPackage) {
		return;
	}
	if (!build.src) {
		print.error("No source directory defined (buildPackage.src)!");
		return;
	}
	if (!build.dest) {
		print.error("No destination directory defined (buildPackage.dest)!");
		return;
	}
	if (!build.name) {
		print.error("No buildPackage name defined!");
		return;
	}
	if (build.name === packageData.name) {
		print.error("The buildPackage name couldn't be the same as the package name!");
		return;
	}

	return build;
}

module.exports = getBuildPackage;
