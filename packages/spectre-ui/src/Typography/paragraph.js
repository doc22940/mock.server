// @flow
/* global props defaultProps */

import "spectre.css";
import React, { Component } from "react";
import type { Children } from "react";

export type ParagraphPropsType = {
	children?: Children,
	innerHtml?: string,
	lang?: string,
	className?: string
};

class Paragraph extends Component {
	props: ParagraphPropsType;

	get className(): string {
		return this.props.className || "";
	}

	render(): Children {
		const { children, innerHtml, lang } = this.props;

		if (typeof innerHtml === "string") {
			let langAttr = "";
			if (lang) {
				langAttr = ` lang="${lang}"`;
			}
			return (
				<div
					className={this.className}
					dangerouslySetInnerHTML={{ __html: `<p${langAttr}>${innerHtml}</p>` }}
				/>
			);
		}
		return (
			<p className={this.className} lang={lang}>
				{children}
			</p>
		);
	}
}

export default Paragraph;
