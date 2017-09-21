// @flow
/* global props defaultProps */

import "spectre.css";
import React, { Component } from "react";
import type { Element } from "react";

import noop from "../utils/noop.js";
export type TypeEnumType = "button" | "submit" | "reset";
export type ModifierEnumType = "primary" | "link" | "action" | "action circle";
export type SizeEnumType = "sm" | "lg" | "block";

export type ButtonPropsType = {
	disabled?: boolean,
	tabIndex?: number,
	type?: TypeEnumType,
	label?: string,
	modifier?: ModifierEnumType,
	size?: SizeEnumType,
	className?: string,
	onClick?: Function
};

class Button extends Component {
	static defaultProps = {
		type: "button",
		disabled: false,
		tabIndex: -1,
		onClick: noop
	};

	props: ButtonPropsType;

	get className(): string {
		const { modifier, size, className } = this.props;
		const classNames: Array<string> = ["btn"];

		if (modifier) {
			classNames.push(`btn-${modifier}`);
		}

		if (size) {
			classNames.push(`btn-${size}`);
		}

		if (className) {
			classNames.push(className);
		}

		return classNames.join(" ");
	}

	render(): Element<*> {
		const { type, disabled, tabIndex, label, onClick } = this.props;

		return (
			<button className={this.className} type={type} disabled={disabled} tabIndex={tabIndex} onClick={onClick}>
				{label}
			</button>
		);
	}
}

export default Button;
