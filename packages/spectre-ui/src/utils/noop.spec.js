/* global describe it expect */

import noop from "./noop";

describe("noop", () => {
	it("exist", () => {
		expect(typeof noop).toBe("function");
	});
	it("void", () => {
		expect(typeof noop()).toBe("undefined");
	});
});
