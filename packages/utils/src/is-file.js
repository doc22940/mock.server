// @flow

import fs from 'fs';

export function isFile(dirPath: string): boolean {
	try {
		return fs.statSync(dirPath).isFile();
	} catch (err) {
		return false;
	}
}
