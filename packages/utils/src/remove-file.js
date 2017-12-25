// @flow

import fs from 'fs';

export function removeFile(filePath: string): boolean {
	try {
		fs.unlinkSync(filePath);
		return true;
	} catch (err) {
		return false;
	}
}
