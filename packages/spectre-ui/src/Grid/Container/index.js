// @flow

import "spectre.css";
import React from "react";

import type { ContainerPropsType } from "../../../spectre-ui.js.flow";

const Container = ({ children, className, size }: ContainerPropsType): React$Element<*> => (
	<div className={`container ${className || ""} ${size ? `grid-${size}` : ""}`}>{children}</div>
);

Container.displayName = "Grid/Container";

export default Container;
