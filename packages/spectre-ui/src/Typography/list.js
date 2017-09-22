// @flow
/* global props defaultProps */

import "spectre.css";
import React, { Component } from "react";
import type { Element, Children } from "react";

export type TypeEnumType = "ul" | "ol" | "dl";
export type EntryType = string | { name: string, entries: Array<EntryType> };
export type EntriesType = Array<EntryType>;

export type ListPropsType = {
	entries: EntriesType,
	type?: TypeEnumType,
	className?: string,
	classNameEntry?: string
};

class List extends Component {
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

	props: ListPropsType;

	renderEntry = (entry: EntryType, index: number): Children => {
		const Tag = `${this.getItemTag(index)}`;
		if (typeof entry === "object") {
			if (entry.entries.length >= 1) {
				return (
					<Tag key={this.getKeyFromValue(entry.name, index)} className={this.classNameEntry}>
						{entry.name}
						<this.rootTag className={this.className}>{entry.entries.map(this.renderEntry)}</this.rootTag>
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

	render(): Element<*> {
		const { entries } = this.props;

		if (!(entries instanceof Array) || entries.length < 1) {
			return <div />;
		}

		return <this.rootTag className={this.className}>{entries.map(this.renderEntry)}</this.rootTag>;
	}
}

export default List;
