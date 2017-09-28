// @flow
/* eslint no-undef: 0*/

import "spectre.css";
import React, { Component } from "react";
import noop from "../../utils/noop";
import hasValue from "../../utils/has-value";

import type {
	SelectPropsType,
	SelectStateType,
	SelectOptionPropsType,
} from "../../../spectre-ui.js.flow";

class Select extends Component<SelectPropsType, SelectStateType> {
	static displayName = "Forms/Select";

	state = {
		focused: false,
	};

	handleChange = (event: SyntheticInputEvent<>) => {
		if (this.isControlled && this.props.onChange) {
			this.props.onChange(event);
		}
	};

	handleFocus = (event: SyntheticFocusEvent<>) => {
		this.setState({ focused: true });
		if (this.props.onFocus) {
			this.props.onFocus(event);
		}
	};

	handleBlur = (event: SyntheticFocusEvent<>) => {
		this.setState({ focused: false });
		if (this.props.onBlur) {
			this.props.onBlur(event);
		}
	};

	handleRefInput = (node: HTMLInputElement) => {
		this.input = node;
		if (this.props.inputRef) {
			this.props.inputRef(node);
		}
	};

	// Holds the input reference
	input: HTMLInputElement | null = null;

	get className(): string {
		return `form-select ${this.props.className || ""}`;
	}

	get isControlled(): boolean {
		return hasValue(this.props.value);
	}

	render(): React$Element<*> {
		const {
			id,
			multiple,
			autoFocus,
			onKeyUp = noop,
			onKeyDown = noop,
			disabled = false,
			required,
			readOnly = false,
			value,
			name,
			defaultValue,
			selectProps,
			entries,
			chooseText,
		} = this.props;

		if (!Array.isArray(entries) || entries.length < 1) {
			return <div />;
		}

		return (
			<select
				ref={this.handleRefInput}
				id={id}
				multiple={multiple}
				autoFocus={autoFocus}
				onChange={this.handleChange}
				onKeyUp={onKeyUp}
				onKeyDown={onKeyDown}
				onBlur={this.handleBlur}
				onFocus={this.handleFocus}
				disabled={disabled}
				required={required ? true : undefined}
				readOnly={readOnly}
				className={this.className}
				value={value}
				name={name}
				defaultValue={defaultValue}
				{...selectProps}
			>
				{chooseText && <option>{chooseText}</option>}
				{entries.map((entry: SelectOptionPropsType): React$Element<*> => (
					<option key={entry.name} value={entry.name}>
						{entry.value || entry.name}
					</option>
				))}
			</select>
		);
	}
}

export default Select;
