// @flow

import fs from 'fs';

export function isDir(dirPath: string): boolean {
	try {
		return fs.statSync(dirPath).isDirectory();
	} catch (err) {
		return false;
	}
}
