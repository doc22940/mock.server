// @flow
/* global module */
/* eslint no-inline-comments: 0*/

import React from "react";
// import type { Element } from "react";
// import { storiesOf } from "@storybook/react";
// import { action } from "@storybook/addon-actions";

import Doc, { DocSection, DocElement, DocCode, DocProps } from "./Doc";
import Table from "../src/Table";

const head = [["Name", "Genre", "Release date"]];
const body = [
	["The Shawshank Redemption", "Crime, Drama", "14 October 1994"],
	["The Godfather", "Crime, Drama", "24 March 1972"]
];

const DocTables = (): React$Element<*> => (
	<Doc title="Tables" desc="Tables include default styles for tables and data sets.">
		<DocSection>
			<DocElement id="table1">
				<Table head={head} body={body} />
			</DocElement>
			<DocCode id="table1" />
		</DocSection>
		<DocSection title="Striped Table">
			<DocElement id="table2">
				<Table modifiers={["striped"]} head={head} body={body} />
			</DocElement>
			<DocCode id="table2" />
		</DocSection>
		<DocSection title="Hover Table">
			<DocElement id="table3">
				<Table modifiers={["hover"]} head={head} body={body} />
			</DocElement>
			<DocCode id="table3" />
		</DocSection>
		<DocSection title="Table with active row">
			<DocElement id="table4">
				<Table head={head} body={body} activeRow={1} />
			</DocElement>
			<DocCode id="table4" />
		</DocSection>
		<DocSection title="Props">
			<DocProps
				props={[
					"TablePropsType",
					"TableClassPropsType",
					"TableDefaultPropsType",
					"TableArrayType",
					"TableValueType",
					"TableModifierEnumType"
				]}
			/>
		</DocSection>
	</Doc>
);

export default DocTables;
