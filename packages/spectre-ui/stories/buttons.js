// @flow
/* global module */
/* eslint no-inline-comments: 0*/

import React from "react";
// import type { Element } from "react";
// import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Doc, { DocSection, DocElement, DocCode, DocProps } from "./Doc";
import Button from "../src/Button";

const DocButtons = (): React$Element<*> => (
	<Doc title="Buttons" desc="Buttons include simple button styles for actions in different types and sizes.">
		<DocSection>
			<DocElement id="buttons1">
				<Button label="default button" onClick={action("clicked default button")} />{" "}
				<Button label="primary button" modifier="primary" onClick={action("clicked primary button")} />{" "}
				<Button label="link button" modifier="link" onClick={action("clicked link button")} />
			</DocElement>
			<DocCode id="buttons1" />
		</DocSection>
		<DocSection title="Button sizes">
			<DocElement id="buttons2">
				<Button size="lg" modifier="primary" label="large button" onClick={action("clicked large button")} />
				<br />
				<br />
				<Button modifier="primary" label="normal button" onClick={action("clicked normal button")} />
				<br />
				<br />
				<Button size="sm" modifier="primary" label="small button" onClick={action("clicked small button")} />
				<br />
				<br />
				<Button size="block" modifier="primary" label="block button" onClick={action("clicked block button")} />
			</DocElement>
			<DocCode id="buttons2" />
		</DocSection>
		<DocSection title="Action button">
			<DocElement id="buttons3">
				<div>
					<Button modifier="action" size="lg" onClick={action("clicked action button")} />{" "}
					<Button modifier="action" onClick={action("clicked action button")} />{" "}
					<Button modifier="action" size="sm" onClick={action("clicked action button")} />
				</div>
				<br />
				<div>
					<Button modifier="action circle" size="lg" onClick={action("clicked action circle button")} />{" "}
					<Button modifier="action circle" onClick={action("clicked action circle button")} />{" "}
					<Button modifier="action circle" size="sm" onClick={action("clicked action circle button")} />
				</div>
			</DocElement>
			<DocCode id="buttons3" />
		</DocSection>
		<DocSection title="Button states">
			<DocElement id="buttons4">
				<Button disabled label="default disabled" />{" "}
				<Button disabled label="primary disabled" modifier="primary" />{" "}
				<Button disabled label="link disabled" modifier="link" />
			</DocElement>
			<DocCode id="buttons4" />
		</DocSection>
		<DocSection>
			<DocElement id="buttons5">
				<div>
					<Button loading label="default loading" />{" "}
					<Button loading label="primary loading" modifier="primary" />{" "}
					<Button loading label="link loading" modifier="link" />
				</div>
			</DocElement>
			<DocCode id="buttons5" />
		</DocSection>
		<DocSection title="Props">
			<DocProps
				props={[
					"ButtonPropsType",
					"ButtonClassPropsType",
					"ButtonDefaultPropsType",
					"ButtonTypeType",
					"ButtonModifierType",
					"ButtonSizeType"
				]}
			/>
		</DocSection>
	</Doc>
);

export default DocButtons;
