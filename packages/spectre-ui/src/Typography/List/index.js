// @flow

import "spectre.css";
import React, { Component } from "react";
import type { ListPropsType, ListEntryType } from "../../../spectre-ui.js.flow";

class List extends Component<ListPropsType> {
	// eslint-disable-next-line
	static displayName = "Typography/List";

	getItemTag(index: number): string {
		const { type = "ul" } = this.props;
		if (type === "dl") {
			return index % 2 === 0 ? "dt" : "dd";
		}
		return "li";
	}

	getKeyFromValue(value: string, index: number): string {
		return `${value.replace(/ /g, "").trim()}-${index}`;
	}

	get rootTag(): string {
		const { type = "ul" } = this.props;
		return `${type}`;
	}

	get className(): string {
		return this.props.className || "";
	}

	get classNameEntry(): string {
		return this.props.classNameEntry || "";
	}

	// eslint-disable-next-line
	renderEntry = (entry: ListEntryType, index: number): React$Element<*> => {
		const Tag = `${this.getItemTag(index)}`;
		const RootTag = this.rootTag;
		if (typeof entry === "object") {
			if (entry.entries.length >= 1) {
				return (
					<Tag key={this.getKeyFromValue(entry.name, index)} className={this.classNameEntry}>
						{entry.name}
						<RootTag className={this.className}>{entry.entries.map(this.renderEntry)}</RootTag>
					</Tag>
				);
			}
			return (
				<Tag key={this.getKeyFromValue(entry.name, index)} className={this.classNameEntry}>
					{entry.name}
				</Tag>
			);
		}
		return (
			<Tag key={this.getKeyFromValue(entry, index)} className={this.classNameEntry}>
				{entry}
			</Tag>
		);
	};

	render(): React$Element<*> {
		const { entries } = this.props;
		if (!(entries instanceof Array) || entries.length < 1) {
			return <div />;
		}
		const RootTag = this.rootTag;
		return <RootTag className={this.className}>{entries.map(this.renderEntry)}</RootTag>;
	}
}

export default List;
