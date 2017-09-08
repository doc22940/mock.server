"use strict";

const fs = require("fs");
const getSrcFiles = require("../utils/get-src-files");
const babelify = require("../utils/babelify");

getSrcFiles(file => {
	babelify(file);
	fs.watchFile(file, () => {
		babelify(file);
	});
});
