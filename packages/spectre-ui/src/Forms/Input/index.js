// @flow
/* eslint no-undef: 0*/

import "spectre.css";
import React, { Component } from "react";
import noop from "../../utils/noop.js";

import type { InputPropsType, InputStateType, DirtyCheckObjType } from "../../../spectre-ui.js.flow";

// Supports determination of isControlled().
// Controlled input accepts its current value as a prop.
//
// @see https://facebook.github.io/react/docs/forms.html#controlled-components
// @param value
// @returns {boolean} true if string (including '') or number (including zero)
export function hasValue(value: ?(number | string | Array<*>)): boolean {
	return value !== undefined && value !== null && !(Array.isArray(value) && value.length === 0);
}

// Determine if field is dirty (a.k.a. filled).
//
// Response determines if label is presented above field or as placeholder.
//
// @param obj
// @param SSR
// @returns {boolean} False when not present or empty string.
//                    True when any number or string with length.
export function isDirty(obj: DirtyCheckObjType, SSR: boolean = false): boolean {
	return Boolean(
		obj &&
			((obj.value && hasValue(obj.value) && obj.value !== "") ||
				(SSR && obj.defaultValue && hasValue(obj.defaultValue) && obj.defaultValue !== ""))
	);
}

class Input extends Component<InputPropsType, InputStateType> {
	static displayName = "Forms/Input";

	state = {
		focused: false
	};

	componentWillMount() {
		if (this.isControlled) {
			this.checkDirty(this.props);
		}
	}

	componentDidMount() {
		if (!this.isControlled) {
			this.checkDirty(this.input);
		}
	}

	componentWillUpdate(nextProps: InputPropsType) {
		if (this.isControlled) {
			this.checkDirty(nextProps);
		}
		// else performed in the onChange
	}

	handleChange = (event: SyntheticInputEvent<>) => {
		if (!this.isControlled) {
			this.checkDirty(this.input);
		}

		// Perform in the willUpdate
		if (this.props.onChange) {
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

	checkDirty(obj: DirtyCheckObjType) {
		// const { muiFormControl } = this.context;

		if (isDirty(obj)) {
			// if (muiFormControl && muiFormControl.onDirty) {
			// 	muiFormControl.onDirty();
			// }
			if (this.props.onDirty) {
				this.props.onDirty();
			}
			return;
		}

		// if (muiFormControl && muiFormControl.onClean) {
		// 	muiFormControl.onClean();
		// }
		if (this.props.onClean) {
			this.props.onClean();
		}
	}

	// Holds the input reference
	input: HTMLInputElement | null = null;

	get className(): string {
		return `form-input ${this.props.className || ""}`;
	}

	get isControlled(): boolean {
		return hasValue(this.props.value);
	}

	render(): React$Element<*> {
		const Tag = `input`;
		const {
			id,
			autoComplete,
			autoFocus,
			onKeyUp = noop,
			onKeyDown = noop,
			disabled = false,
			required,
			readOnly = false,
			value,
			name,
			defaultValue,
			placeholder,
			type = "text",
			rows,
			inputProps
		} = this.props;

		return (
			<Tag
				ref={this.handleRefInput}
				id={id}
				autoComplete={autoComplete}
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
				placeholder={placeholder}
				type={type}
				rows={rows}
				{...inputProps}
			/>
		);
	}
}

export default Input;
