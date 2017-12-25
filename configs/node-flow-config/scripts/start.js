'use strict';

const fs = require('fs');
const watchFiles = require('../utils/watch-files');
const babelify = require('../utils/babelify');
const getCopyFiles = require('../utils/get-copy-files');
const copy = require('../utils/copy');
const paths = require('../config/paths');

watchFiles(
	`${paths.appSrc}/**/*.js`,
	file => {
		babelify(file);
	},
	{ignored: [/.test.js$/, /.spec.js$/]}
);
getCopyFiles(file => {
	copy(file);
	fs.watchFile(file, () => {
		copy(file);
	});
});
