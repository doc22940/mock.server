// @flow

import "spectre.css";
import React from "react";

import type { LabelPropsType } from "../../../spectre-ui.js.flow";

function getClassName({ className }: { className?: string }): string {
	const classNames: Array<string> = ["form-label"];

	if (className) {
		classNames.push(className);
	}

	return classNames.join(" ");
}

const Label = ({ className, htmlFor, children }: LabelPropsType): React$Element<*> => (
	<label className={getClassName({ className })} htmlFor={htmlFor}>
		{children}
	</label>
);

Label.displayName = "Forms/Label";

export default Label;
