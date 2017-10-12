"use strict";

const path = require("path");
const fs = require("fs");
const url = require("url");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(path, needsSlash) {
	const hasSlash = path.endsWith("/");
	if (hasSlash && !needsSlash) {
		return path.substr(path, path.length - 1);
	} else if (!hasSlash && needsSlash) {
		return `${path}/`;
	} else {
		return path;
	}
}

const getPublicUrl = appPackageJson => envPublicUrl || require(appPackageJson).homepage;

function getServedPath(appPackageJson) {
	const publicUrl = getPublicUrl(appPackageJson);
	const servedUrl = envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : "/");
	return ensureSlash(servedUrl, true);
}

const appNodeModulesUncompiled = [];
if (process.env.NODE_MODULES_UNCOMPILED) {
	const dirs = process.env.NODE_MODULES_UNCOMPILED.split(";");
	dirs.forEach(dir => {
		appNodeModulesUncompiled.push(resolveApp(dir));
	});
}

const resolveOwn = relativePath => path.resolve(__dirname, "..", relativePath);
module.exports = {
	currentDirectory: appDirectory,
	dotenv: resolveApp(".env"),
	appPath: resolveApp("."),
	appBuild: resolveApp("build"),
	appPublic: resolveApp("public"),
	appHtml: resolveApp("public/index.html"),
	appIndexJs: resolveApp("src/index.js"),
	appPackageJson: resolveApp("package.json"),
	appFlowConfig: resolveApp(".flowconfig"),
	appSrc: resolveApp("src"),
	testsSetup: resolveApp("src/setupTests.js"),
	appNodeModules: resolveApp("node_modules"),
	appNodeModulesUncompiled: appNodeModulesUncompiled,
	publicUrl: getPublicUrl(resolveApp("package.json")),
	servedPath: getServedPath(resolveApp("package.json")),
	// These properties only exist before ejecting:
	ownPath: resolveOwn("."),
	ownNodeModules: resolveOwn("node_modules"), // This is empty on npm 3
};
