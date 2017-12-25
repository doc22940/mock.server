// @flow

import makeDir from 'make-dir';

export function writeDir(dirPath: string) {
	makeDir.sync(dirPath);
}
