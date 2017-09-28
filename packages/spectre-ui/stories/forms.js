// @flow
/* global module */
/* eslint no-inline-comments: 0*/
import React from "react";
// import type { Element } from "react";
// import { action } from "@storybook/addon-actions";

import Doc, { DocSection, DocElement, DocCode, DocProps } from "./Doc";
import { Group, TextField, Checkbox, Switch, Select } from "../src/Forms";

export const DocTextField = (): React$Element<*> => (
	<Doc>
		<DocSection title="TextField">
			<DocElement id="formsInput2">
				<TextField id="input1-2" label="Name" name="name" autoComplete="name" />
				<TextField
					label="Email"
					id="input2-2"
					name="email"
					type="email"
					autoComplete="email"
				/>
			</DocElement>
			<DocCode id="formsInput2" />
			<DocProps
				props={["TextFieldPropsType", "InputDefaultPropsType", "TextFieldDefaultPropsType"]}
			/>
		</DocSection>
	</Doc>
);

export const DocTextarea = (): React$Element<*> => (
	<Doc>
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
			<DocProps
				props={["TextFieldPropsType", "InputDefaultPropsType", "TextFieldDefaultPropsType"]}
			/>
		</DocSection>
	</Doc>
);

export const DocCheckbox = (): React$Element<*> => (
	<Doc>
		<DocSection title="Checkbox">
			<DocElement id="formsCheckbox">
				{/* controlled */}
				<Checkbox checked id="checkbox" label="Remember me" />
				{/* uncontrolled */}
				<Checkbox defaultChecked id="checkbox-1" label="Remember me" />
			</DocElement>
			<DocCode id="formsCheckbox" />
			<DocProps
				props={[
					"CheckboxPropsType",
					"InputDefaultPropsType",
					"LabeledInputDefaultPropsType",
					"CheckboxOverridePropsType",
					"CheckboxDefaultPropsType",
					"CheckboxTypeEnumType",
				]}
			/>
		</DocSection>
	</Doc>
);

export const DocSwitch = (): React$Element<*> => (
	<Doc>
		<DocSection title="Switch">
			<DocElement id="formsSwitch">
				{/* controlled */}
				<Switch checked id="switch" label="Remember me" />
				{/* uncontrolled */}
				<Switch defaultChecked id="switch-2" label="Remember me" />
			</DocElement>
			<DocCode id="formsSwitch" />
			<DocProps
				props={[
					"SwitchPropsType",
					"InputDefaultPropsType",
					"LabeledInputDefaultPropsType",
					"CheckboxDefaultPropsType",
				]}
			/>
		</DocSection>
	</Doc>
);

export const DocSelect = (): React$Element<*> => (
	<Doc>
		<DocSection title="Select">
			<DocElement id="formsSelect">
				{/* controlled */}
				<Group>
					<Select
						autoFocus
						value="slack"
						chooseText="Please choose an option"
						entries={[
							{ name: "slack", value: "Slack" },
							{ name: "skype", value: "Skype" },
							{ name: "hipchat", value: "Hipchat" },
						]}
					/>
				</Group>
				{/* uncontrolled */}
				<Group>
					<Select
						defaultValue="slack"
						chooseText="Please choose an option"
						entries={[
							{ name: "slack", value: "Slack" },
							{ name: "skype", value: "Skype" },
							{ name: "hipchat", value: "Hipchat" },
						]}
					/>
				</Group>
			</DocElement>
			<DocCode id="formsSelect" />
		</DocSection>
		<DocSection title="Multiselect">
			<DocElement id="formsSelect2">
				{/* uncontrolled */}
				<Group>
					<Select
						multiple
						defaultValue="slack"
						chooseText="Please choose an option"
						entries={[
							{ name: "slack", value: "Slack" },
							{ name: "skype", value: "Skype" },
							{ name: "hipchat", value: "Hipchat" },
						]}
					/>
				</Group>
			</DocElement>
			<DocCode id="formsSelect2" />
			<DocProps
				props={["SelectPropsType", "SelectDefaultPropsType", "SelectOptionPropsType"]}
			/>
		</DocSection>
	</Doc>
);

const DocForms = (): React$Element<*> => (
	<Doc
		title="Forms"
		desc="Forms provide the most common control styles used in forms, including input, textarea, select, checkbox, radio and switch."
	/>
);

export default DocForms;
