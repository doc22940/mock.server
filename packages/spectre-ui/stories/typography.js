// @flow
/* global module */

import React from "react";
import type { Element } from "react";
import { storiesOf } from "@storybook/react";

import { Heading, Paragraph, Blockquote, List } from "../src/Typography";

storiesOf("Typography", module)
	.add("Heading", (): Element<*> => (
		<div>
			<Heading>
				H1 Heading <small className="label">40px</small>
			</Heading>
			<Heading type="h2">
				H2 Heading <small className="label">32px</small>
			</Heading>
			<Heading type="h3">
				H3 Heading <small className="label">28px</small>
			</Heading>
			<Heading type="h4">
				H4 Heading <small className="label">24px</small>
			</Heading>
			<Heading type="h5">
				H5 Heading <small className="label">20px</small>
			</Heading>
			<Heading type="h6">
				H6 Heading <small className="label">16px</small>
			</Heading>
			<Heading type="h6" tag="span">
				Span with H6 Heading style
			</Heading>
		</div>
	))
	.add("Paragraph", (): Element<*> => (
		<div>
			<Paragraph>Lorem ipsum dolor sit amet, ...</Paragraph>
			<Paragraph innerHtml="<strong>InnerHtml:</strong> <kbd>Ctrl + S</kbd> <mark>Highlighted</mark>" />
			<Heading type="h6" tag="p">
				Chinese (Simplified)
			</Heading>
			<Paragraph lang="zh-Hans">
				革命不是请客吃饭，不是做文章，不是绘画绣花，不能那样雅致，那样从容不迫，“文质彬彬”，那样“温良恭俭让”。革命就是暴动，是一个阶级推翻一个阶级的暴烈的行动。
			</Paragraph>
		</div>
	))
	.add("Blockquote", (): Element<*> => (
		<div>
			<Blockquote>
				<p>
					The advance of technology is based on making it fit in so that you don't really even notice it, so
					it's part of everyday life.{" "}
				</p>
				<cite>- Bill Gates</cite>
			</Blockquote>
		</div>
	))
	.add("List", (): Element<*> => {
		const entries = [{ name: "list item 2", entries: ["list item 2.1", "list item 2.2"] }, "list item 3"];
		const entriesDl = ["Desc 1", "Value 1", "Desc 2", "Value 2"];
		return (
			<div>
				<Heading type="h6">Unordered List</Heading>
				<List entries={entries} />
				<Heading type="h6">Ordered List</Heading>
				<List type="ol" entries={entries} />
				<Heading type="h6">Description List</Heading>
				<List type="dl" entries={entriesDl} />
			</div>
		);
	});
