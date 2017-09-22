/* global describe it expect */

import React from "react";
import { shallow } from "enzyme";
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
		it("snapshot: no children", () => {
			const _props = { ...props, children: undefined };
			const tree = shallow(<Paragraph {..._props} />);
			expect(tree).toMatchSnapshot();
		});
		it("snapshot: no className", () => {
			const _props = { ...props, className: undefined };
			const tree = shallow(<Paragraph {..._props} />);
			expect(tree).toMatchSnapshot();
		});
		it("snapshot: no innerHtml", () => {
			const _props = { ...props, innerHtml: undefined };
			const tree = shallow(<Paragraph {..._props} />);
			expect(tree).toMatchSnapshot();
		});
		it("snapshot: no lang", () => {
			const _props = { ...props, lang: undefined };
			const tree = shallow(<Paragraph {..._props} />);
			expect(tree).toMatchSnapshot();
		});
	});
});
