/* global describe it expect */

import React from "react";
import { shallow } from "enzyme";
import { itOptionalProps, itArrayProps } from "../../utils/test-utils";
import List from "./index";

const propsEntries = [{ name: "list item 2", entries: ["list item 2.1", "list item 2.2"] }, "list item 3"];

const props: Object = {
	entries: propsEntries,
	type: "ol",
	className: "class-name",
	classNameEntry: "class-name-entry"
};

describe("List", () => {
	describe("render", () => {
		it("snapshot: default", () => {
			const _props = { ...props };
			const tree = shallow(<List {..._props} />);
			expect(tree).toMatchSnapshot();
		});
		itOptionalProps(List, props, ["className", "classNameEntry", "type"]);
		itArrayProps(List, props, ["entries"]);
		it("snapshot: type dl", () => {
			const _props = { ...props, type: "dl" };
			const tree = shallow(<List {..._props} />);
			expect(tree).toMatchSnapshot();
		});
		it("snapshot: empty entries in second level", () => {
			const entries = [].concat(propsEntries);
			entries[0].entries = [];
			const _props = { ...props, entries };
			const tree = shallow(<List {..._props} />);
			expect(tree).toMatchSnapshot();
		});
	});
});
