// @flow

import 'spectre.css/dist/spectre.min.css';
import React from "react";
import { Input } from "../index";
import type { LabeledInputPropsType } from "../../../spectre-ui.js.flow";

export type GetClassPropsType = {
	type: string,
	classNameLabel?: string,
};

function getClassName({ type, classNameLabel }: GetClassPropsType): string {
	const classNames: Array<string> = [];

	switch (type) {
		case "switch": {
			classNames.push("form-switch");
			break;
		}
		case "radio": {
			classNames.push("form-radio");
			break;
		}
		default: {
			classNames.push("form-checkbox");
			break;
		}
	}
	if (classNameLabel) {
		classNames.push(classNameLabel);
	}

	return classNames.join(" ");
}

const LabeledInput = (props: LabeledInputPropsType): React$Element<*> => {
	const { type = "checkbox", label, classNameLabel, classNameIcon } = props;
	const propsInput = {
		...props,
		classNameLabel: undefined,
		classNameIcon: undefined,
		label: undefined,
		type: type === "switch" ? "checkbox" : type,
	};

	return (
		<label className={getClassName({ type, classNameLabel })}>
			<Input {...propsInput} />
			<i className={`form-icon ${classNameIcon || ""}`} /> {label}
		</label>
	);
};

LabeledInput.displayName = "Forms/LabeledInput";

export default LabeledInput;
