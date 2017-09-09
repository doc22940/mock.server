/* global describe it expect */
import { encode } from "./index.js";

describe("encode", () => {
	it("method: default", () => {
		expect(encode("/app/v1/products/:productId")).toBe("L2FwcC92MS9wcm9kdWN0cy86cHJvZHVjdElk");
	});
});
