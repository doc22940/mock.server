/* eslint no-empty: 0*/
"use strict";

const fs = require("fs");
const paths = require("../config/paths");
const appPackageJson = paths.appPackageJson;

function getPackage() {
	return JSON.parse(fs.readFileSync(appPackageJson, "utf8"));
}

module.exports = getPackage;
