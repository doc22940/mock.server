// @flow
/* global module */

import React from "react";
import type { Element } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Button from "../src/Button";

storiesOf("Button", module)
	.add("default button", (): Element<*> => (
		<Button label="default button" onClick={action("clicked default button")} />
	))
	.add("primary button", (): Element<*> => (
		<Button label="primary button" modifier="primary" onClick={action("clicked primary button")} />
	))
	.add("link button", (): Element<*> => (
		<Button label="link button" modifier="link" onClick={action("clicked link button")} />
	))
	.add("action button", (): Element<*> => (
		<div>
			<Button modifier="action" size="lg" onClick={action("clicked action button")} />
			<Button modifier="action" onClick={action("clicked action button")} />
			<Button modifier="action" size="sm" onClick={action("clicked action button")} />
		</div>
	))
	.add("action circle button", (): Element<*> => (
		<div>
			<Button modifier="action circle" size="lg" onClick={action("clicked action circle button")} />
			<Button modifier="action circle" onClick={action("clicked action circle button")} />
			<Button modifier="action circle" size="sm" onClick={action("clicked action circle button")} />
		</div>
	))
	.add("large button", (): Element<*> => (
		<Button label="large button" size="lg" onClick={action("clicked large button")} />
	))
	.add("small button", (): Element<*> => (
		<Button label="small button" size="sm" onClick={action("clicked small button")} />
	))
	.add("block button", (): Element<*> => (
		<Button label="block button" size="block" onClick={action("clicked block button")} />
	))
	.add("disabled button", (): Element<*> => (
		<Button label="disabled button" disabled onClick={action("clicked disabled button")} />
	));
