// @flow

import 'spectre.css/dist/spectre.min.css';
import React from "react";
import { Radio, Group, Label } from "../index";

import type { RadiosPropsType, RadioEntryPropsType } from "../../../spectre-ui.js.flow";

const Radios = ({
	label,
	entries,
	name,
	value,
	defaultValue,
}: RadiosPropsType): React$Element<*> => {
	const out: Array<React$Element<*>> = [];

	if (!name || !Array.isArray(entries)) {
		return <div />;
	}

	entries.forEach((radioProps: RadioEntryPropsType) => {
		const thisProps = { ...radioProps, name, key: radioProps.id };

		if (typeof value === "string") {
			// console.log("checked", radioProps.id);
			out.push(
				<Radio
					checked={thisProps.id === value}
					id={thisProps.id}
					label={thisProps.label}
					{...thisProps}
				/>
			);
			return;
		}

		if (typeof defaultValue === "string") {
			out.push(
				<Radio
					defaultChecked={thisProps.id === defaultValue}
					id={thisProps.id}
					label={thisProps.label}
					{...thisProps}
				/>
			);
			return;
		}
	});

	return (
		<Group>
			{label && <Label>{label}</Label>}
			{out}
		</Group>
	);
};

Radios.displayName = "Forms/Radios";

export default Radios;
