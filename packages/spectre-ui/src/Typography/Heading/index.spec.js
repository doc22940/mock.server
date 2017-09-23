/* global describe it expect */

import React from "react";
import { shallow } from "enzyme";
import { itOptionalProps } from "../../utils/test-utils";
import Heading from "./index";

const props: Object = {
	children: <div />,
	type: "h2",
	tag: "h2",
	className: "class-name"
};

describe("Heading", () => {
	describe("render", () => {
		it("snapshot: default", () => {
			const _props = { ...props };
			const tree = shallow(<Heading {..._props} />);
			expect(tree).toMatchSnapshot();
		});
		itOptionalProps(Heading, props, ["className", "children", "type", "tag"]);
		it("snapshot: no tag & no type", () => {
			const _props = { ...props, tag: undefined, type: undefined };
			const tree = shallow(<Heading {..._props} />);
			expect(tree).toMatchSnapshot();
		});
	});
});
