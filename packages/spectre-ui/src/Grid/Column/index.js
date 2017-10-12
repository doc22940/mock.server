// @flow
/* eslint complexity: 0*/

import 'spectre.css/dist/spectre.min.css';
import React from "react";

import type { ColumnPropsType, ColumnSizeEnumType } from "../../../spectre-ui.js.flow";

export type GetColSizesClassNamesType = {
	xs?: ColumnSizeEnumType,
	sm?: ColumnSizeEnumType,
	md?: ColumnSizeEnumType,
	lg?: ColumnSizeEnumType,
	xl?: ColumnSizeEnumType,
};

function isValidSize(size?: number): boolean {
	return typeof size === "number" && size >= 1 && size <= 12;
}

function getColSizesClassNames(sizes: GetColSizesClassNamesType): string {
	let defaultSizes = { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 };

	if (Object.keys(sizes).length < 1) {
		return "";
	}

	if (isValidSize(sizes.xl)) {
		defaultSizes = { xs: sizes.xl, sm: sizes.xl, md: sizes.xl, lg: sizes.xl, xl: sizes.xl };
	}

	if (isValidSize(sizes.lg)) {
		defaultSizes = { ...defaultSizes, xs: sizes.lg, sm: sizes.lg, md: sizes.lg, lg: sizes.lg };
	}

	if (isValidSize(sizes.md)) {
		defaultSizes = { ...defaultSizes, xs: sizes.md, sm: sizes.md, md: sizes.md };
	}

	if (isValidSize(sizes.sm)) {
		defaultSizes = { ...defaultSizes, xs: sizes.sm, sm: sizes.sm };
	}

	if (isValidSize(sizes.xs)) {
		defaultSizes = { ...defaultSizes, xs: sizes.xs };
	}

	const out: Array<string> = [];
	Object.keys(defaultSizes).forEach((key: string) => {
		out.push(`col-${key}-${defaultSizes[key]}`);
	});
	return out.join(" ");
}

function getClassName({ className, flex, align, xs, sm, md, lg, xl }: ColumnPropsType): string {
	const out: Array<string> = ["column"];

	if (className) {
		out.push(className);
	}

	if (!flex && !align) {
		out.push(getColSizesClassNames({ xs, sm, md, lg, xl }));
		return out.join(" ");
	}

	if (!flex) {
		flex = 12;
	}

	out.push(`col-${flex}`);

	if (align) {
		switch (align) {
			case "left":
				out.push("col-mr-auto");
				break;
			case "right":
				out.push("col-ml-auto");
				break;
			default:
				out.push("col-mx-auto");
				break;
		}
	}
	return out.join(" ");
}

const Column = (props: ColumnPropsType): React$Element<*> => (
	<div className={getClassName(props)}>{props.children}</div>
);

Column.displayName = "Grid/Column";

export default Column;
