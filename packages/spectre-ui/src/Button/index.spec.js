/* global describe it expect */

import React from "react";
import { shallow } from "enzyme";
import { itOptionalProps } from "../utils/test-utils";
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
		itOptionalProps(Button, props, [
			"disabled",
			"tabIndex",
			"type",
			"label",
			"modifier",
			"size",
			"className",
			"onClick"
		]);
		it("snapshot: disabled", () => {
			const _props = { ...props, disabled: false };
			const tree = shallow(<Button {..._props} />);
			expect(tree).toMatchSnapshot();
		});
	});
});
