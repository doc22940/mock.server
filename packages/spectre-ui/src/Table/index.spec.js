/* global describe it expect */

import React from "react";
import { shallow } from "enzyme";
import { itOptionalProps, itArrayProps } from "../utils/test-utils";
import Table from "./index";

const propsHead = [["Name", "Genre", "Release date"]];
const propsBody = [
	["The Shawshank Redemption", "Crime, Drama", "14 October 1994"],
	["The Godfather", "Crime, Drama", "24 March 1972"]
];

const props: Object = {
	head: propsHead,
	body: propsBody,
	modifiers: ["striped", "hover"],
	className: "class-name",
	classNameHead: "class-name-head",
	classNameHeadRow: "class-name-head-row",
	classNameHeadCell: "class-name-head-cell",
	classNameBody: "class-name-body",
	classNameBodyRow: "class-name-body-row",
	classNameBodyCell: "class-name-body-cell",
	activeRow: 1
};

describe("Table", () => {
	describe("render", () => {
		it("snapshot: default", () => {
			const _props = { ...props };
			const tree = shallow(<Table {..._props} />);
			expect(tree).toMatchSnapshot();
		});
		itOptionalProps(Table, props, [
			"head",
			"body",
			"modifiers",
			"className",
			"classNameHead",
			"classNameHeadRow",
			"classNameHeadCell",
			"classNameBody",
			"classNameBodyRow",
			"classNameBodyCell",
			"activeRow"
		]);
		itArrayProps(Table, props, ["head", "body", "modifiers"]);
	});
});
