// @flow

import del from 'del';

export function removeDir(dirPath: string): boolean {
	try {
		del.sync([`${dirPath}/**`]);
		return true;
	} catch (err) {
		return false;
	}
}
