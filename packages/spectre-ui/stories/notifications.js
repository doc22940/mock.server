// @flow
/* global module */
/* eslint no-inline-comments: 0*/

import React from "react";
// import type { Element } from "react";
// import { storiesOf } from "@storybook/react";
// import { action } from "@storybook/addon-actions";

import Doc, { DocSection, DocElement, DocCode, DocProps } from "./Doc";
import Notifications, { notify } from "../src/Notifications";
import Button from "../src/Button";
import Toast from "../src/Toast";

import type { NotificationRenderArgsType } from "../spectre-ui.js.flow";

const DocToasts = (): React$Element<*> => (
	<Doc title="Notifications" desc="Notifications are used to show system informations to users.">
		<DocSection>
			<DocElement id="notifications1">
				<Notifications />
				<Button
					modifier="primary"
					label="trigger notification"
					onClick={() => {
						notify({
							delay: 4000,
							render({
								handleCloseNotification,
							}: NotificationRenderArgsType): React$Element<*> {
								return (
									<Toast
										title="I'm a notification"
										text="Notifications are used to show system informations to users."
										onClickBackground={handleCloseNotification}
									/>
								);
							},
						});
					}}
				/>
				<br />
				<br />
				<Button
					label="trigger success notification"
					onClick={() => {
						notify({
							delay: 4000,
							render({
								handleCloseNotification,
							}: NotificationRenderArgsType): React$Element<*> {
								return (
									<Toast
										type="success"
										title="Success notification"
										onClickBackground={handleCloseNotification}
									/>
								);
							},
						});
					}}
				/>
			</DocElement>
			<DocCode id="notifications1" />
			<DocProps
				props={["NotificationsPropsType", "NotificationType", "NotificationRenderArgsType"]}
			/>
		</DocSection>
	</Doc>
);

export default DocToasts;
