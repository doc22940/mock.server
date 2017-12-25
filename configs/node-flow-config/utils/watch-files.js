/* eslint no-console: 0*/
/* eslint complexity: 0*/
'use strict';

const fs = require('fs');
const chokidar = require('chokidar');
const print = require('./print');
const paths = require('../config/paths');
const getBuildPackage = require('./get-build-package');

function watchFiles(dirPath, onMatch, chokidarOptions = {}) {
	const watcher = chokidar.watch(
		dirPath,
		Object.assign(
			{},
			{
				ignored: /^\./,
				persistent: true,
				ignoreInitial: false,
			},
			chokidarOptions
		)
	);
	watcher
		.on('unlink', file => {
			try {
				const packageBuildData = getBuildPackage();
				if (!packageBuildData) {
					return;
				}
				const target = file.replace(packageBuildData.src, packageBuildData.dest);
				fs.unlinkSync(target);
				print.error(`removed file ${target.replace(paths.currentDirectory, '')}`);
			} catch (err) {
				console.error(err);
			}
		})
		.on('add', onMatch)
		.on('change', onMatch)
		.on('error', error => {
			print.error('Error happened', error);
		});
}

module.exports = watchFiles;
