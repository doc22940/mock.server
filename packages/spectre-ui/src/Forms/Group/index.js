// @flow

import 'spectre.css/dist/spectre.min.css';
import React from "react";

import type { GroupPropsType } from "../../../spectre-ui.js.flow";

function getClassName({ className }: { className?: string }): string {
	const classNames: Array<string> = ["form-group"];

	if (className) {
		classNames.push(className);
	}

	return classNames.join(" ");
}

const Group = ({ className, children }: GroupPropsType): React$Element<*> => (
	<div className={getClassName({ className })}>{children}</div>
);

Group.displayName = "Forms/Group";

export default Group;
