// @flow

import fs from 'fs';

export function writeFile(filePath: string, data: string) {
	try {
		fs.writeFileSync(filePath, data);
	} catch (err) {
		throw new Error(err);
	}
}
