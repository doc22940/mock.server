// @flow

import 'spectre.css/dist/spectre.min.css';
import React from "react";
import { Input, Label, Group } from "../index";

import type { TextFieldPropsType } from "../../../spectre-ui.js.flow";

const TextField = (props: TextFieldPropsType): React$Element<*> => {
	const { id, label, className, classNameLabel } = props;
	const propsInput = {
		...props,
		className: props.classNameInput,
		classNameLabel: undefined,
		label: undefined,
	};
	return (
		<Group className={className}>
			{label && (
				<Label className={classNameLabel} htmlFor={id}>
					{label}
				</Label>
			)}
			<Input {...propsInput} />
		</Group>
	);
};

TextField.displayName = "Forms/TextField";

export default TextField;
