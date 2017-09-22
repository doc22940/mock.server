// @flow
/* global props defaultProps */

import "spectre.css";
import React, { Component } from "react";
import type { Element, Children } from "react";

export type TypeEnumType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type HeadingPropsType = {
	children?: Children,
	type?: TypeEnumType,
	tag?: string,
	className?: string
};

class Heading extends Component {
	props: HeadingPropsType;

	get className(): string {
		const { type, className } = this.props;
		const classNames: Array<string> = [(type || "h1").toString()];
		if (className) {
			classNames.push(className);
		}
		return classNames.join("");
	}

	render(): Element<*> {
		const { tag, type, children } = this.props;
		const Tag = `${tag || type || "h1"}`;
		return <Tag className={this.className}>{children}</Tag>;
	}
}

export default Heading;
