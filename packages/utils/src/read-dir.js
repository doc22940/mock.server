// @flow

import fs from 'fs';

function isIgnored(ignore: Array<string | RegExp>, filePath: string): boolean {
	let ignored: boolean = false;
	ignore.forEach((ignoreItem: string | RegExp) => {
		const result: ?Array<string> = filePath.match(ignoreItem);
		if (Array.isArray(result) && result.length > 0) {
			ignored = true;
		}
	});
	return ignored;
}

export function readDir(dirPath: string, ignore: Array<string | RegExp> = ['.DS_Store']): Array<string> {
	const results: Array<string> = [];
	let list: Array<string> = [];

	try {
		list = fs.readdirSync(dirPath);
	} catch (err) {
		return [];
	}

	list.forEach((file: string) => {
		if (!isIgnored(ignore, file)) {
			results.push(file);
		}
	});
	return results;
}
