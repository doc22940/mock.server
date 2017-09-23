// @flow
/* global props defaultProps */

import "spectre.css";
import React from "react";
import type { ParagraphPropsType } from "../../../spectre-ui.js.flow";

const Paragraph = ({ children, innerHtml, lang, className }: ParagraphPropsType): React$Element<*> => {
	if (typeof innerHtml === "string") {
		let langAttr = "";
		if (lang) {
			langAttr = ` lang="${lang}"`;
		}
		return <div className={className} dangerouslySetInnerHTML={{ __html: `<p${langAttr}>${innerHtml}</p>` }} />;
	}
	return (
		<p className={className} lang={lang}>
			{children}
		</p>
	);
};

Paragraph.displayName = "Typography/Paragraph";

export default Paragraph;
