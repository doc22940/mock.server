/* global describe it expect */

import React from "react";
import { shallow } from "enzyme";
import { itOptionalProps } from "../../utils/test-utils";
import Blockquote from "./index";

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
		itOptionalProps(Blockquote, props, ["children", "className"]);
	});
});
