// @flow
/* global module */
/* eslint no-inline-comments: 0*/

import React from "react";
// import type { Element } from "react";
// import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Doc, { DocSection, DocElement, DocCode, DocProps } from "./Doc";
import Toast from "../src/Toast";

const DocToasts = (): React$Element<*> => (
	<Doc title="Toasts" desc="Toasts are used to show alert or information to users.">
		<DocSection>
			<DocElement id="toasts1">
				<Toast
					title="Toast Title"
					text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
					onClickClose={action("clicked close button")}
					onClickBackground={action("clicked background")}
				/>
				<br />
				<Toast
					type="primary"
					title="Toast Title"
					text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
				/>
			</DocElement>
			<DocCode id="toasts1" />
			<DocElement id="toasts2">
				<Toast type="success" text="Toast success" />
				<br />
				<Toast type="warning" text="Toast warning" />
				<br />
				<Toast type="error" text="Toast error" />
			</DocElement>
			<DocCode id="toasts2" />
			<DocProps props={["ToastPropsType", "ToastTypeEnumType"]} />
		</DocSection>
	</Doc>
);

export default DocToasts;
