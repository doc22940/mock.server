// @flow
/* global props defaultProps */

import "spectre.css";
import React, { Component } from "react";
import type { Element, Children } from "react";

export type BlockquotePropsType = {
	children?: Children
};

class Blockquote extends Component {
	props: BlockquotePropsType;

	get className(): string {
		return "";
	}

	render(): Element<*> {
		const { children } = this.props;

		return <blockquote className={this.className}>{children}</blockquote>;
	}
}

export default Blockquote;
