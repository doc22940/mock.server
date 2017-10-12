/* eslint no-empty: 0*/
"use strict";

const paths = require("../config/paths");
const appPackageJson = paths.appPackageJson;

function getPackageFile(onMatch = () => {}) {
	onMatch(appPackageJson);
	return appPackageJson;
}

module.exports = getPackageFile;
