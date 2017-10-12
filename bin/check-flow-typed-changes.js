/* eslint no-console: 0*/
/* eslint complexity: 0*/
"use strict";

/**
 * The helper was created to solve the problem of make sure changed flow-typed
 * libs are also reflected in the packages where the libirary is used.
 * This problem will only happens in monorepos while developing multiple libraries in the same repository.
**/
const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");
const { execSync } = require("child_process");
const print = require("./utils/print");
const getLernaPackages = require("./utils/get-lerna-packages");
const getPackage = require("./utils/get-package");
const flowAddLibs = require("./utils/flow-add-libs");
const flowRemoveLibs = require("./utils/flow-remove-libs");

/**
 * @param {string} flowTypedLibName - the flow-typed library name
 * @param {Function} onMatch - callback function will be executed in case of a package was found
 * @returns {Array<string>} - returns an array of found package pathes
**/
function getLernaPackagesByLib(flowTypedLibName, onMatch) {
	const files = [];

	getLernaPackages(packagePath => {
		const packageData = getPackage(packagePath);
		const packageDependencies = Object.assign(
			{},
			packageData.dependencies,
			packageData.devDependencies
		);
		if (!packageDependencies[flowTypedLibName]) {
			return;
		}
		files.push(packagePath);
		onMatch(packagePath);
	});

	return files;
}

/**
 * @desc Removes the reference to the libs directory from the flow config file. Run `npm run flow`
 *       to make sure the reference is destroyed. Afterwards the reference to the libs directory in
 *       the flow config will be restored and rerun `npm run flow`.
 * @param {string} packagePath - the path to the package where the flow-typed lib is used
 * @returns {void}
**/
function refreshFlowInLernaPackage(packagePath) {
	const flowConfigFile = path.join(packagePath, ".flowconfig");
	flowRemoveLibs(flowConfigFile);
	execSync(`cd ${packagePath} && npm run flow`);
	flowAddLibs(flowConfigFile);
	execSync(`cd ${packagePath} && npm run flow`);
	console.log("");
	console.log("");
	print.log(`Flow typed libraries in ${packagePath} are updated!`);
}

const appDirectory = fs.realpathSync(process.cwd());
const watcher = chokidar.watch(path.join(appDirectory, "flow-typed", "*.js"), {
	ignored: /^\./,
	persistent: true,
	ignoreInitial: true,
});

function updateLibaryInLernaPackages(flowTypedFile) {
	const flowTypedLibName = path.basename(flowTypedFile).replace(/\.js$/, "");
	print.log(`Library ${flowTypedLibName} had changed`);
	getLernaPackagesByLib(flowTypedLibName, packagePath => {
		refreshFlowInLernaPackage(packagePath);
	});
}

watcher
	.on("add", updateLibaryInLernaPackages)
	.on("change", updateLibaryInLernaPackages)
	.on("error", error => {
		print.error("Error happened", error);
	});
