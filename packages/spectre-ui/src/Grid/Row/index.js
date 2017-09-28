// @flow

import "spectre.css";
import React from "react";

import type { RowPropsType } from "../../../spectre-ui.js.flow";

const Row = ({ children, className, gapless, oneline }: RowPropsType): React$Element<*> => (
	<div
		className={`columns ${className || ""}${gapless ? " col-gapless" : ""}${oneline
			? " col-oneline"
			: ""}`}
	>
		{children}
	</div>
);

Row.displayName = "Grid/Row";

export default Row;
