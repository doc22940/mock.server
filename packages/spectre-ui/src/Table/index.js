// @flow
/* global props defaultProps */

import "spectre.css";
import React, { Component } from "react";
import type { Element } from "react";

import noop from "../utils/noop.js";
export type ModifierEnumType = "striped" | "hover";
export type TableValueType = string | number;
export type TableArrayType = Array<Array<TableValueType>>;

export type TablePropsType = {
	head?: TableArrayType,
	body?: TableArrayType,
	modifiers?: Array<ModifierEnumType>,
	className?: string,
	classNameHead?: string,
	classNameHeadRow?: string,
	classNameHeadCell?: string,
	classNameBody?: string,
	classNameBodyRow?: string,
	classNameBodyCell?: string,
	activeRow?: number
};

class Table extends Component {
	static defaultProps = {
		onClick: noop
	};

	props: TablePropsType;

	get className(): string {
		const { modifiers, className } = this.props;
		const classNames: Array<string> = ["table"];

		if (modifiers) {
			modifiers.forEach((modifier: ModifierEnumType) => {
				classNames.push(`table-${modifier}`);
			});
		}

		if (className) {
			classNames.push(className);
		}

		return classNames.join(" ");
	}

	render(): Element<*> {
		const {
			head,
			body,
			activeRow,
			classNameHead,
			classNameHeadRow,
			classNameHeadCell,
			classNameBody,
			classNameBodyRow,
			classNameBodyCell
		} = this.props;

		return (
			<table className={this.className}>
				{head &&
					head.length > 0 && (
						<thead className={classNameHead}>
							{head.map((cells: Array<TableValueType>, rowIndex: number): Element<*> => (
								<tr key={rowIndex} className={classNameHeadRow}>
									{cells.length > 0 &&
										cells.map((cell: TableValueType, index: number): Element<*> => (
											<th key={index} className={classNameHeadCell}>
												{cell}
											</th>
										))}
								</tr>
							))}
						</thead>
					)}
				{body &&
					body.length > 0 && (
						<tbody className={classNameBody}>
							{body.map((cells: Array<TableValueType>, rowIndex: number): Element<*> => (
								<tr
									key={rowIndex}
									className={`${classNameBodyRow || ""} ${activeRow === rowIndex ? "active" : ""}`}
								>
									{cells.length > 0 &&
										cells.map((cell: TableValueType, index: number): Element<*> => (
											<td key={index} className={classNameBodyCell}>
												{cell}
											</td>
										))}
								</tr>
							))}
						</tbody>
					)}
			</table>
		);
	}
}

export default Table;
