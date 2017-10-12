// @flow

import 'spectre.css/dist/spectre.min.css';
import React from "react";
import { Group, LabeledInput } from "../index";
import type { CheckboxPropsType } from "../../../spectre-ui.js.flow";

const Checkbox = (props: CheckboxPropsType): React$Element<*> => {
	const { classNameGroup, asSwitch, id, label } = props;
	const propsLabeledInput = { ...props, type: asSwitch ? "switch" : "checkbox" };
	return (
		<Group className={classNameGroup}>
			<LabeledInput id={id} label={label} {...propsLabeledInput} />
		</Group>
	);
};

Checkbox.displayName = "Forms/Checkbox";

export default Checkbox;
