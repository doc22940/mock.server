/* global module */

import React from "react";
// import type { Element } from "react";
// import { action } from "@storybook/addon-actions";

import Doc, { DocSection, DocElement, DocCode, DocProps } from "./Doc";
import { Input, Label } from "../src/Forms";

const DocForms = (): React$Element<*> => (
	<Doc
		title="Forms"
		desc="Forms provide the most common control styles used in forms, including input, textarea, select, checkbox, radio and switch."
	>
		<DocSection>
			<DocElement id="formsInput1">
				<Label htmlFor="input1">Name</Label>
				<Input id="input1" />
				<Input placeholder="Placeholder" />
				<Input autoFocus />
			</DocElement>
			<DocCode id="formsInput1" />
			<DocProps props={["InputPropsType", "LabelPropsType"]} />
		</DocSection>
	</Doc>
);

export default DocForms;
