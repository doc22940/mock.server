const fs = require("fs");
const path = require("path");
const FindFiles = require("node-find-files");
const Sync = require("sync");
const makeDir = require("make-dir");

const flowTypeDefinitionReg = /\.js\.flow$/;
// const flowTypedDirectoryReg = /flow\-typed$/;
const ignoreReg = /\/node_modules\//;

function find(dir, reg, onComplete) {
	const results = [];
	const filePath = path.join(__dirname, dir);
	if (!fs.statSync(filePath).isDirectory()) {
		onComplete(null, []);
	}
	const finder = new FindFiles({
		rootFolder: filePath,
		filterFunction(foundPath) {
			return foundPath.search(reg) >= 0 && foundPath.search(ignoreReg) < 0;
		}
	});
	finder.on("match", strPath => {
		results.push(strPath);
	});
	finder.on("complete", () => {
		onComplete(null, results);
	});
	finder.startSearch();
}

function copyPath(source, target, targetReplace) {
	const fileName = path.basename(source);
	fs.createReadStream(source).pipe(fs.createWriteStream(`${target}/${fileName.replace(targetReplace, "")}`));
}

// eslint-disable-next-line
Sync(() => {
	const sources = find.sync(null, "/../packages/", flowTypeDefinitionReg);
	const targets = [path.join(__dirname, "/../flow-typed")];

	sources.forEach(source => {
		targets.forEach(target => {
			makeDir.sync(target);
			copyPath(source, target, /\.flow/);
		});
	});
});
