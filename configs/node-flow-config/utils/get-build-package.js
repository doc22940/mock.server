/* eslint no-empty: 0*/
/* eslint complexity: 0*/
'use strict';

const getPackage = require('./get-package');

function getBuildPackage() {
	const packageData = getPackage();
	const build = packageData.buildPackage;
	let src = 'src';
	let dest = 'dist';

	if (build && build.src) {
		src = build.src;
	}
	if (build && build.dest) {
		dest = build.dest;
	}

	return {
		src,
		dest,
	};
}

module.exports = getBuildPackage;
