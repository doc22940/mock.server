// @flow

import "spectre.css";
import React from "react";

import type {
	TablePropsType,
	TableClassPropsType,
	TableModifierEnumType,
	TableValueType
} from "../../spectre-ui.js.flow";

function getClassName({ modifiers, className }: TableClassPropsType): string {
	const classNames: Array<string> = ["table"];

	if (modifiers) {
		modifiers.forEach((modifier: TableModifierEnumType) => {
			classNames.push(`table-${modifier}`);
		});
	}

	if (className) {
		classNames.push(className);
	}

	return classNames.join(" ");
}

const Table = ({
	head,
	body,
	activeRow,
	modifiers,
	className,
	classNameHead,
	classNameHeadRow,
	classNameHeadCell,
	classNameBody,
	classNameBodyRow,
	classNameBodyCell
}: TablePropsType): React$Element<*> => (
	<table className={getClassName({ modifiers, className })}>
		{head &&
			head.length > 0 && (
				<thead className={classNameHead}>
					{head.map((cells: Array<TableValueType>, rowIndex: number): React$Element<*> => (
						<tr key={rowIndex} className={classNameHeadRow}>
							{cells.length > 0 &&
								cells.map((cell: TableValueType, index: number): React$Element<*> => (
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
					{body.map((cells: Array<TableValueType>, rowIndex: number): React$Element<*> => (
						<tr
							key={rowIndex}
							className={`${classNameBodyRow || ""} ${activeRow === rowIndex ? "active" : ""}`}
						>
							{cells.length > 0 &&
								cells.map((cell: TableValueType, index: number): React$Element<*> => (
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

export default Table;
