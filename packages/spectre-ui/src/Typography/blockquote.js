// @flow
/* global props defaultProps */

import "spectre.css";
import React, { Component } from "react";
import type { Element, Children } from "react";

export type BlockquotePropsType = {
	children?: Children,
	className?: string
};

class Blockquote extends Component {
	props: BlockquotePropsType;

	get className(): string {
		return this.props.className || "";
	}

	render(): Element<*> {
		const { children } = this.props;

		return <blockquote className={this.className}>{children}</blockquote>;
	}
}

export default Blockquote;
