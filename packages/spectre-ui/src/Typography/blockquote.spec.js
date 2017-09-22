/* global describe it expect */

import React from "react";
import { shallow } from "enzyme";
import Blockquote from "./blockquote";

const props: Object = {
	children: <div />,
	className: "class-name"
};

describe("Blockquote", () => {
	describe("render", () => {
		it("snapshot: default", () => {
			const _props = { ...props };
			const tree = shallow(<Blockquote {..._props} />);
			expect(tree).toMatchSnapshot();
		});
		it("snapshot: no children", () => {
			const _props = { ...props, children: undefined };
			const tree = shallow(<Blockquote {..._props} />);
			expect(tree).toMatchSnapshot();
		});
		it("snapshot: no className", () => {
			const _props = { ...props, className: undefined };
			const tree = shallow(<Blockquote {..._props} />);
			expect(tree).toMatchSnapshot();
		});
	});
});
