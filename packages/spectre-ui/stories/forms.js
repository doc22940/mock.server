/* global module */

import React from "react";
// import type { Element } from "react";
// import { action } from "@storybook/addon-actions";

import Doc, { DocSection, DocElement, DocCode, DocProps } from "./Doc";
import { Input, Label, Group, TextField } from "../src/Forms";

const DocForms = () => (
	<Doc
		title="Forms"
		desc="Forms provide the most common control styles used in forms, including input, textarea, select, checkbox, radio and switch."
	>
		<DocSection>
			<DocElement id="formsInput1">
				<Group>
					<Label htmlFor="input1">Name</Label>
					<Input id="input1" name="name" autoComplete="name" />
				</Group>
				<Group>
					<Label htmlFor="input2">Email</Label>
					<Input id="input2" name="email" autoComplete="email" />
				</Group>
			</DocElement>
			<DocCode id="formsInput1" />
			<DocProps props={["InputPropsType", "LabelPropsType", "GroupPropsType"]} />
		</DocSection>
		<DocSection title="TextField">
			<DocElement id="formsInput2">
				<TextField label="Name" id="input1-2" name="name" autoComplete="name" />
				<TextField
					label="Email"
					id="input2-2"
					name="email"
					type="email"
					autoComplete="email"
				/>
			</DocElement>
			<DocCode id="formsInput2" />
			<DocProps props={["TextFieldPropsType", "TextFieldDefaultPropsType"]} />
		</DocSection>
		<DocSection title="Textarea">
			<DocElement id="formsTextarea">
				<TextField
					label="Message"
					placeholder="Textarea"
					id="input-textarea"
					name="textarea"
					rows={3}
				/>
			</DocElement>
			<DocCode id="formsTextarea" />
		</DocSection>
	</Doc>
);

export default DocForms;
