// @flow

import 'spectre.css/dist/spectre.min.css';
import React from 'react';

import noop from '../utils/noop.js';
import type {ButtonClassPropsType, ButtonPropsType} from '../../spectre-ui.js.flow';

function getClassName({modifier, size, className, loading}: ButtonClassPropsType): string {
	const classNames: Array<string> = ['btn'];

	if (modifier) {
		classNames.push(`btn-${modifier}`);
	}

	if (loading) {
		classNames.push(`loading`);
	}

	if (size) {
		classNames.push(`btn-${size}`);
	}

	if (className) {
		classNames.push(className);
	}

	return classNames.join(' ');
}

const Button = ({
	modifier,
	size,
	className,
	type = 'button',
	disabled = false,
	tabIndex = -1,
	label,
	onClick = noop,
	loading = false,
}: ButtonPropsType): React$Element<*> => (
	<button
		className={getClassName({modifier, size, className, loading})}
		type={type}
		disabled={disabled || loading}
		tabIndex={tabIndex}
		onClick={onClick}
	>
		{label}
	</button>
);

Button.displayName = 'Button';

export default Button;
