// @flow
/* global module */

import React from "react";
import type { Element } from "react";
import { storiesOf } from "@storybook/react";

import Buttons from "./buttons.js";
import Forms from "./forms.js";
import Typography from "./typography.js";
import Tables from "./tables.js";

storiesOf("Elements", module)
	.add("Typography", (): Element<*> => <Typography />)
	.add("Tables", (): Element<*> => <Tables />)
	.add("Buttons", (): Element<*> => <Buttons />)
	.add("Forms", (): Element<*> => <Forms />);
