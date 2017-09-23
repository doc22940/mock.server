// @flow

import type { TestType } from "../node-mock-server-uuid.js.flow";

export const test: TestType = { name: "test" };

export function decode(encodedPath: string): string {
	return new Buffer(encodedPath, "base64").toString("ascii").replace(/\/\//g, "/");
}

export function encode(path: string): string {
	return new Buffer(path).toString("base64");
}
