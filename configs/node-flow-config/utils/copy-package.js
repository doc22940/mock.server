/* eslint no-empty: 0*/
/* eslint complexity: 0*/
'use strict';

const fs = require('fs');
const path = require('path');
const makeDir = require('make-dir');
const print = require('./print');
const paths = require('../config/paths');
const getPackage = require('./get-package');
const getBuildPackage = require('./get-build-package');
const currentDirectory = paths.currentDirectory;

function copyPackage() {
	const packageData = getPackage();
	const packageBuildData = getBuildPackage();
	const packageDataCopy = Object.assign({}, packageData);
	if (!packageBuildData) {
		return;
	}

	const buildPath = path.join(currentDirectory, packageBuildData.dest);
	makeDir.sync(buildPath);

	packageDataCopy.name = packageBuildData.name;
	delete packageDataCopy.buildPackage;
	if (packageBuildData.ignore) {
		packageBuildData.ignore.forEach(ignoreAttr => {
			delete packageDataCopy[ignoreAttr];
		});
	}

	const targetFile = path.join(buildPath, 'package.json');
	makeDir.sync(path.join(buildPath, 'node_modules'));
	fs.writeFileSync(targetFile, JSON.stringify(packageDataCopy, null, 4), {
		mode: 0o755,
	});
	print.log(`wrote file ${targetFile.replace(currentDirectory, '')}`);
}

module.exports = copyPackage;
