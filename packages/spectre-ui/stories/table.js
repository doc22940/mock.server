// @flow
/* global module */

import React from "react";
import type { Element } from "react";
import { storiesOf } from "@storybook/react";
// import { action } from "@storybook/addon-actions";

import Table from "../src/Table";

const head = [["Name", "Genre", "Release date"]];
const body = [
	["The Shawshank Redemption", "Crime, Drama", "14 October 1994"],
	["The Godfather", "Crime, Drama", "24 March 1972"]
];

storiesOf("Table", module)
	.add("default table", (): Element<*> => <Table head={head} body={body} />)
	.add("striped table", (): Element<*> => <Table modifiers={["striped"]} head={head} body={body} />)
	.add("hover table", (): Element<*> => <Table modifiers={["hover"]} head={head} body={body} />)
	.add("active row table", (): Element<*> => <Table head={head} body={body} activeRow={1} />);
