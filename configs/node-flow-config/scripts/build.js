'use strict';

const getSrcFiles = require('../utils/get-src-files');
const babelify = require('../utils/babelify');
const getCopyFiles = require('../utils/get-copy-files');
const copy = require('../utils/copy');

getSrcFiles(file => {
	babelify(file);
});
getCopyFiles(file => {
	copy(file);
});
