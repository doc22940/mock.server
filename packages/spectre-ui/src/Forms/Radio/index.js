// @flow

import "spectre.css";
import React from "react";
import { LabeledInput } from "../index";

import type { RadioPropsType } from "../../../spectre-ui.js.flow";

const Radio = (props: RadioPropsType): React$Element<*> => {
	return <LabeledInput type="radio" {...props} />;
};

Radio.displayName = "Forms/Radio";

export default Radio;
