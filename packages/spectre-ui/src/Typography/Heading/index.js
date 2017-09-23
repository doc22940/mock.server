// @flow

import "spectre.css";
import React from "react";
import type { HeadingPropsType } from "../../../spectre-ui.js.flow";

const Heading = ({ tag, type = "h1", children, className = "" }: HeadingPropsType): React$Element<*> => {
	const Tag = `${tag || type}`;
	return <Tag className={`${className} ${type}`}>{children}</Tag>;
};

Heading.displayName = "Typography/Heading";

export default Heading;
