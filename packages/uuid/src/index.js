// @flow

export function decode(encodedPath: string): string {
	return new Buffer(decodeURIComponent(encodedPath), 'base64').toString('ascii').replace(/\/\//g, '/');
}

export function encode(path: string): string {
	return encodeURIComponent(new Buffer(path).toString('base64'));
}
