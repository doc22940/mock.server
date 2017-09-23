// @flow

import "spectre.css";
import React from "react";

import noop from "../utils/noop.js";
import type { ButtonClassPropsType, ButtonPropsType } from "../../spectre-ui.js.flow";

function getClassName({ modifier, size, className }: ButtonClassPropsType): string {
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

const Button = ({
	modifier,
	size,
	className,
	type = "button",
	disabled = false,
	tabIndex = -1,
	label,
	onClick = noop
}: ButtonPropsType): React$Element<*> => (
	<button
		className={getClassName({ modifier, size, className })}
		type={type}
		disabled={disabled}
		tabIndex={tabIndex}
		onClick={onClick}
	>
		{label}
	</button>
);

export default Button;
