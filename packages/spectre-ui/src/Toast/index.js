// @flow
/* global props defaultProps */

import 'spectre.css/dist/spectre.min.css';
import React from "react";
import Button from "../Button";
import type { ToastPropsType, ToastTypeEnumType } from "../../spectre-ui.js.flow";

export type ToastClassNameType = {
	className?: string,
	type?: ToastTypeEnumType,
};

function getClassName({ className, type }: ToastClassNameType): string {
	const classNames: Array<string> = ["toast"];

	if (className) {
		classNames.push(className);
	}

	if (type && type !== "") {
		classNames.push(`toast-${type}`);
	}

	return classNames.join(" ");
}

const Toast = ({
	type,
	title,
	text,
	closable = true,
	className,
	classNameTitle,
	classNameButton,
	onClickClose,
	onClickBackground,
}: ToastPropsType): React$Element<*> => {
	return (
		<div className={getClassName({ className, type })} onClick={onClickBackground}>
			{closable && (
				<Button
					className={`btn-clear float-right ${classNameButton || ""}`}
					onClick={onClickClose}
				/>
			)}
			{title && <h5 className={`${classNameTitle || ""}`}>{title}</h5>}
			{text || ""}
		</div>
	);
};

Toast.displayName = "Toast";

export default Toast;
