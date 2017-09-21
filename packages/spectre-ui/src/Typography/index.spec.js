/* global describe it expect */

import { Heading, Paragraph, Blockquote, List } from "./index";

describe("Typography", () => {
	describe("exist", () => {
		it("Heading", () => {
			expect(typeof Heading).toBe("function");
		});
		it("Paragraph", () => {
			expect(typeof Paragraph).toBe("function");
		});
		it("Blockquote", () => {
			expect(typeof Blockquote).toBe("function");
		});
		it("List", () => {
			expect(typeof List).toBe("function");
		});
	});
});
