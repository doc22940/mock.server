/* global describe it expect */

import React from "react";
import { shallow } from "enzyme";
import { itOptionalProps } from "../utils/test-utils";
import Paragraph from "./paragraph";

const props: Object = {
	children: <div />,
	innerHtml: "<span>Inner Html</span>",
	lang: "zh-Hans",
	className: "class-name"
};

describe("Blockquote", () => {
	describe("render", () => {
		it("snapshot: default", () => {
			const _props = { ...props };
			const tree = shallow(<Paragraph {..._props} />);
			expect(tree).toMatchSnapshot();
		});
		itOptionalProps(Paragraph, props, ["className", "children", "innerHtml", "lang"]);
	});
});
