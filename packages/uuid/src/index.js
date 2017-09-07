// @flow

function decode(): string {
	return new Buffer(encodedPath, "base64").toString("ascii").replace(/\/\//g, "/");
}

function encode(path: string) {
	return new Buffer(path).toString("base64");
}

module.exports = {
	decode,
	encode
};
