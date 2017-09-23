// @flow
/* global props defaultProps */

import "spectre.css";
import React from "react";

import type { BlockquotePropsType } from "../../../spectre-ui.js.flow";

const Blockquote = ({ children, className }: BlockquotePropsType): React$Element<*> => (
	<blockquote className={className}>{children}</blockquote>
);

Blockquote.displayName = "Typography/Blockquote";

export default Blockquote;
