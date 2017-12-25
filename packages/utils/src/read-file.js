// @flow

import fs from 'fs';

export function readFile(filePath: string): ?string {
	try {
		return fs.readFileSync(filePath, 'utf8');
	} catch (err) {
		return undefined;
	}
}
