// @flow
/* global module */
/* eslint no-inline-comments: 0*/

import React from "react";
// import type { Element } from "react";
// import { storiesOf } from "@storybook/react";
// import { action } from "@storybook/addon-actions";

import Doc, { DocSection, DocElement, DocCode, DocProps } from "./Doc";
import { Container, Row, Column } from "../src/Grid";

export const DocFlexbox = (): React$Element<*> => (
	<Doc
		title="Flexbox grid"
		desc="Layout includes flexbox based responsive grid system with 12 columns."
	>
		<DocSection>
			<DocElement id="gridFlex1">
				<Container size="lg">
					<Row>
						<Column flex={12}>
							<span className="bg-gray docs-block">col-12 (100%)</span>
						</Column>
					</Row>
					<Row>
						<Column flex={9}>
							<span className="bg-gray docs-block">col-9 (75%)</span>
						</Column>
					</Row>
					<Row>
						<Column flex={6}>
							<span className="bg-gray docs-block">col-6 (50%)</span>
						</Column>
					</Row>
					<Row>
						<Column flex={3}>
							<span className="bg-gray docs-block">col-3 (25%)</span>
						</Column>
					</Row>
				</Container>
			</DocElement>
			<DocCode id="gridFlex1" />
		</DocSection>
		<DocSection title="Gapless">
			<DocElement id="gridFlex2">
				<Container size="lg">
					<Row gapless>
						<Column flex={6}>
							<span className="bg-gray docs-block">col-6 (gapless)</span>
						</Column>
						<Column flex={6}>
							<span className="bg-gray docs-block">col-6 (gapless)</span>
						</Column>
					</Row>
				</Container>
			</DocElement>
			<DocCode id="gridFlex2" />
		</DocSection>
		<DocSection title="Oneline">
			<DocElement id="gridFlex3">
				<Container size="lg">
					<Row oneline>
						<Column flex={8}>
							<span className="bg-gray docs-block">col-8 (oneline)</span>
						</Column>
						<Column flex={8}>
							<span className="bg-gray docs-block">col-8 (oneline)</span>
						</Column>
					</Row>
				</Container>
			</DocElement>
			<DocCode id="gridFlex3" />
		</DocSection>
	</Doc>
);

export const DocOffset = (): React$Element<*> => (
	<Doc
		title="Grid offset"
		desc="The Flexbox grid provides margin auto utilities to set offset. There are col-mx-auto, col-ml-auto and col-mr-auto to set margins between columns without using empty columns."
	>
		<DocSection>
			<DocElement id="gridOffset1">
				<Container size="lg">
					<Row>
						<Column flex={2}>
							<span className="bg-gray docs-block">col-2</span>
						</Column>
						<Column flex={4} align="center">
							<span className="bg-gray docs-block">col-4 col-mx-auto</span>
						</Column>
					</Row>
					<Row>
						<Column flex={2}>
							<span className="bg-gray docs-block">col-2</span>
						</Column>
						<Column flex={4} align="right">
							<span className="bg-gray docs-block">col-4 col-ml-auto</span>
						</Column>
					</Row>
					<Row>
						<Column flex={4} align="right">
							<span className="bg-gray docs-block">col-4 col-ml-auto</span>
						</Column>
						<Column flex={2}>
							<span className="bg-gray docs-block">col-2</span>
						</Column>
					</Row>
					<Row>
						<Column flex={4} align="center">
							<span className="bg-gray docs-block">col-4 col-mx-auto</span>
						</Column>
						<Column flex={2}>
							<span className="bg-gray docs-block">col-2</span>
						</Column>
					</Row>
					<Row>
						<Column flex={4} align="left">
							<span className="bg-gray docs-block">col-4 col-mr-auto</span>
						</Column>
						<Column flex={2}>
							<span className="bg-gray docs-block">col-2</span>
						</Column>
					</Row>
					<Row>
						<Column flex={4} align="center">
							<span className="bg-gray docs-block">col-4 col-mx-auto</span>
						</Column>
					</Row>
				</Container>
			</DocElement>
			<DocCode id="gridOffset1" />
		</DocSection>
	</Doc>
);

export const DocResponsive = (): React$Element<*> => (
	<Doc title="Responsive" desc="Spectre provides a neat responsive layout grid system.">
		<DocSection>
			<DocElement id="grid1">
				<Container size="lg">
					<Row>
						<Column xl={4} md={6} sm={12}>
							<span className="bg-gray docs-block">Column 1</span>
						</Column>
						<Column xl={4} md={6} sm={12}>
							<span className="bg-gray docs-block">Column 2</span>
						</Column>
						<Column xl={4} md={6} sm={12}>
							<span className="bg-gray docs-block">Column 3</span>
						</Column>
					</Row>
				</Container>
			</DocElement>
			<DocCode id="grid1" />
		</DocSection>
	</Doc>
);

const DocGrid = (): React$Element<*> => (
	<Doc title="Grid" desc="Layout includes flexbox based responsive grid system with 12 columns.">
		<DocProps
			props={[
				"ContainerPropsType",
				"ContainerSizeEnumType",
				"RowPropsType",
				"ColumnPropsType",
				"ColumnSizeEnumType",
				"ColumnAlignEnumType",
			]}
		/>
	</Doc>
);

export default DocGrid;
