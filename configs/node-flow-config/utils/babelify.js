/* eslint global-require: 0*/
/* eslint no-console: 0*/
'use strict';

const fs = require('fs');
const path = require('path');
const makeDir = require('make-dir');
const babel = require('babel-core');
const print = require('./print');
const paths = require('../config/paths');
const getBuildPackage = require('./get-build-package');
const babelTransformOptions = require('../config/babel-transform-options');

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

function babelify(file) {
	try {
		const packageBuildData = getBuildPackage();
		if (!packageBuildData) {
			return;
		}
		const result = babel.transformFileSync(file, babelTransformOptions);
		const target = file.replace(packageBuildData.src, packageBuildData.dest);
		const fileName = path.basename(file);
		makeDir.sync(target.replace(fileName, ''));
		fs.writeFileSync(target, result.code, {
			mode: 0o755,
		});
		print.log(`wrote file ${target.replace(paths.currentDirectory, '')}`);
	} catch (err) {
		console.error(err);
	}
}

module.exports = babelify;
