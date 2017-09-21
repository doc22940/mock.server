/* global describe it expect */

import React from "react";
import { shallow } from "enzyme";
import Heading from "./heading";

const props: Object = {
	children: <div />,
	type: "h2",
	tag: "h2"
};

describe("Heading", () => {
	describe("render", () => {
		it("snapshot: default", () => {
			const _props = { ...props };
			const tree = shallow(<Heading {..._props} />);
			expect(tree).toMatchSnapshot();
		});
		it("snapshot: no children", () => {
			const _props = { ...props, children: undefined };
			const tree = shallow(<Heading {..._props} />);
			expect(tree).toMatchSnapshot();
		});
		it("snapshot: no type", () => {
			const _props = { ...props, type: undefined };
			const tree = shallow(<Heading {..._props} />);
			expect(tree).toMatchSnapshot();
		});
		it("snapshot: no tag", () => {
			const _props = { ...props, tag: undefined };
			const tree = shallow(<Heading {..._props} />);
			expect(tree).toMatchSnapshot();
		});
		it("snapshot: no tag & no type", () => {
			const _props = { ...props, tag: undefined, type: undefined };
			const tree = shallow(<Heading {..._props} />);
			expect(tree).toMatchSnapshot();
		});
	});
});
