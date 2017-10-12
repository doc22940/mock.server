"use strict";

const getSrcFiles = require("../utils/get-src-files");
const getPackageFile = require("../utils/get-package-file");
const babelify = require("../utils/babelify");
const copyPackage = require("../utils/copy-package");
const getCopyFiles = require("../utils/get-copy-files");
const copy = require("../utils/copy");

getSrcFiles(file => {
	babelify(file);
});
getPackageFile(file => {
	copyPackage(file);
});
getCopyFiles(file => {
	copy(file);
});
