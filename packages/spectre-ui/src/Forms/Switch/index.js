// @flow

import 'spectre.css/dist/spectre.min.css';
import React from "react";
import { Checkbox } from "../index";
import type { SwitchPropsType } from "../../../spectre-ui.js.flow";

const Switch = (props: SwitchPropsType): React$Element<*> => {
	return <Checkbox asSwitch {...props} />;
};

Switch.displayName = "Forms/Switch";

export default Switch;
