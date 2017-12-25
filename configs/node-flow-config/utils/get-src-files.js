/* eslint no-empty: 0*/
'use strict';

const rimraf = require('rimraf');
const makeDir = require('make-dir');
const glob = require('glob');
const {appSrc, appBuild} = require('../config/paths');

try {
	rimraf.sync(appBuild);
	makeDir.sync(appBuild);
} catch (err) {}

function getSrcFiles(onMatch) {
	const files = glob.sync(`${appSrc}/**/*.js`, {
		ignore: [`${appSrc}/*.spec.js`, `${appSrc}/**/*.spec.js`, `${appSrc}/*.test.js`, `${appSrc}/**/*.test.js`],
	});
	files.forEach(onMatch);
}

module.exports = getSrcFiles;
