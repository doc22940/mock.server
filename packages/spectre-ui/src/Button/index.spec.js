/* global describe it expect */

import React from "react";
import { shallow } from "enzyme";
import Button from "./index";

const props: Object = {
	disabled: false,
	tabIndex: -1,
	type: "button",
	label: "label",
	modifier: "primary",
	size: "sm",
	className: "className",
	onClick() {}
};

describe("Button", () => {
	describe("render", () => {
		it("snapshot: default", () => {
			const _props = { ...props };
			const tree = shallow(<Button {..._props} />);
			expect(tree).toMatchSnapshot();
		});
		it("snapshot: disabled", () => {
			const _props = { ...props, disabled: false };
			const tree = shallow(<Button {..._props} />);
			expect(tree).toMatchSnapshot();
		});
		it("snapshot: no disabled", () => {
			const _props = { ...props, disabled: undefined };
			const tree = shallow(<Button {..._props} />);
			expect(tree).toMatchSnapshot();
		});
		it("snapshot: no tabIndex", () => {
			const _props = { ...props, tabIndex: undefined };
			const tree = shallow(<Button {..._props} />);
			expect(tree).toMatchSnapshot();
		});
		it("snapshot: no type", () => {
			const _props = { ...props, type: undefined };
			const tree = shallow(<Button {..._props} />);
			expect(tree).toMatchSnapshot();
		});
		it("snapshot: no label", () => {
			const _props = { ...props, label: undefined };
			const tree = shallow(<Button {..._props} />);
			expect(tree).toMatchSnapshot();
		});
		it("snapshot: no modifier", () => {
			const _props = { ...props, modifier: undefined };
			const tree = shallow(<Button {..._props} />);
			expect(tree).toMatchSnapshot();
		});
		it("snapshot: no size", () => {
			const _props = { ...props, size: undefined };
			const tree = shallow(<Button {..._props} />);
			expect(tree).toMatchSnapshot();
		});
		it("snapshot: no className", () => {
			const _props = { ...props, className: undefined };
			const tree = shallow(<Button {..._props} />);
			expect(tree).toMatchSnapshot();
		});
		it("snapshot: no onClick", () => {
			const _props = { ...props, onClick: undefined };
			const tree = shallow(<Button {..._props} />);
			expect(tree).toMatchSnapshot();
		});
	});
});
