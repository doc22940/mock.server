// @flow
/* global module */
/* eslint no-inline-comments: 0*/

import React from "react";
// import type { Element } from "react";
// import { storiesOf } from "@storybook/react";
// import { action } from "@storybook/addon-actions";

import Doc, { DocSection, DocElement, DocCode, DocProps } from "./Doc";
import { H, P, Blockquote, List } from "../src/Typography";

const DocTypography = (): React$Element<*> => (
	<Doc
		title="Typography"
		desc="Typography sets default styles for headings, paragraphs, semantic text, blockquote and lists elements."
	>
		<DocSection title="Headings">
			<DocElement id="headings">
				<H>
					H1 Heading <small className="label">40px</small>
				</H>
				<H type="h2">
					H2 Heading <small className="label">32px</small>
				</H>
				<H type="h3">
					H3 Heading <small className="label">28px</small>
				</H>
				<H type="h4">
					H4 Heading <small className="label">24px</small>
				</H>
				<H type="h5">
					H5 Heading <small className="label">20px</small>
				</H>
				<H type="h6">
					H6 Heading <small className="label">16px</small>
				</H>
				<H type="h6" tag="span">
					Span with H6 Heading style
				</H>
			</DocElement>
			<DocCode id="headings" />
			<DocProps
				props={["HeadingPropsType", "HeadingClassPropsType", "HeadingDefaultPropsType", "HeadingTypeEnumType"]}
			/>
		</DocSection>
		<DocSection title="Paragraphs">
			<DocElement id="paragraphs">
				<P>Lorem ipsum dolor sit amet, ...</P>
				<P innerHtml="<strong>InnerHtml:</strong> <kbd>Ctrl + S</kbd> <mark>Highlighted</mark>" />
				<H type="h6" tag="p">
					Chinese (Simplified)
				</H>
				<P lang="zh-Hans">革命不是请客吃饭，不是做文章，不是绘画绣花，不能那样雅致，那样从容不迫，“文质彬彬”，那样“温良恭俭让”。革命就是暴动，是一个阶级推翻一个阶级的暴烈的行动。</P>
			</DocElement>
			<DocCode id="paragraphs" />
			<DocProps props={["ParagraphPropsType"]} />
		</DocSection>
		<DocSection title="Blockquote">
			<DocElement id="blockquote">
				<Blockquote>
					<P>
						The advance of technology is based on making it fit in so that you don't really even notice it,
						so it's part of everyday life.{" "}
					</P>
					<cite>- Bill Gates</cite>
				</Blockquote>
			</DocElement>
			<DocCode id="blockquote" />
			<DocProps props={["BlockquotePropsType"]} />
		</DocSection>
		<DocSection title="Lists">
			<DocElement id="lists">
				<H type="h6">Unordered List</H>
				<List entries={[{ name: "list item 2", entries: ["list item 2.1", "list item 2.2"] }, "list item 3"]} />
				<H type="h6">Ordered List</H>
				<List type="ol" entries={[{ name: "list item 2", entries: ["list item 2.1", "list item 2.2"] }]} />
				<H type="h6">Description List</H>
				<List type="dl" entries={["Desc 1", "Value 1", "Desc 2", "Value 2"]} />
			</DocElement>
			<DocCode id="lists" />
			<DocProps
				props={["ListPropsType", "ListTypeEnumType", "ListEntryType", "ListEntryObjectType", "ListEntriesType"]}
			/>
		</DocSection>
	</Doc>
);

export default DocTypography;
