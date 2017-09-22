/* global describe it expect */
import React from "react";
import { shallow } from "enzyme";

export function itWithoutProp(Component, props, propName: string) {
	it(`snapshot: no ${propName}`, () => {
		const _props = { ...props, [propName]: undefined };
		const tree = shallow(<Component {..._props} />);
		expect(tree).toMatchSnapshot();
	});
}
export function itOptionalProps(Component, props, propNames: Array<string>) {
	propNames.forEach((propName: string) => {
		itWithoutProp(Component, props, propName);
	});
}
export function itEmptyArrayProp(Component, props, propName: string) {
	it(`snapshot: empty ${propName}`, () => {
		const _props = { ...props, [propName]: [] };
		const tree = shallow(<Component {..._props} />);
		expect(tree).toMatchSnapshot();
	});
}
export function itArrayProps(Component, props, propNames: Array<string>) {
	propNames.forEach((propName: string) => {
		itEmptyArrayProp(Component, props, propName);
	});
}
