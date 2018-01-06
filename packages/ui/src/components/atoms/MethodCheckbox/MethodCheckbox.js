// @flow
/* eslint no-inline-comments: 0*/

import React from 'react';
import { withStyles } from 'material-ui/styles';
import type { $MethodEnumType } from 'node-mock-server-utils';
import { toMethodEnum } from 'node-mock-server-utils';
import IconButton from 'material-ui/IconButton';
import MethodAvatar from '../MethodAvatar/MethodAvatar';
import type { StylesType } from '../../../types/styles';
import type { ClassesType } from '../../../types/classes';

const styles = (): StylesType => ({
	root: {
		cursor: 'pointer',
	},
});

export type MethodCheckboxPropsType = {
	classes?: ClassesType,
	method: $MethodEnumType,
	checked?: boolean,
	onClick: (event: SyntheticMouseEvent<>) => void,
};

const MethodCheckbox = ({
	classes = {},
	method,
	checked = false,
	onClick,
}: MethodCheckboxPropsType): React$Element<*> => {
	const methodEnum = toMethodEnum(method);
	if (!methodEnum) {
		// eslint-disable-next-line
		console.warn(`Method "${method}" is not allowed!`);
		return <div />;
	}
	return (
		<div className={classes.root}>
			{/* $FlowFixMe */}
			<IconButton onClick={onClick}>
				<MethodAvatar disabled={!checked} method={method} />
			</IconButton>
		</div>
	);
};

export default withStyles(styles)(MethodCheckbox);
