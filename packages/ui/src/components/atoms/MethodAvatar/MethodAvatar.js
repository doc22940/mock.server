// @flow
/* eslint no-inline-comments: 0*/

import React from 'react';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import type { $MethodEnumType } from 'node-mock-server-utils';
import { toMethodEnum } from 'node-mock-server-utils';
import styles from './styles';
import type { ClassesType } from '../../../types/classes';

export type MethodAvatarPropsType = {
	classes?: ClassesType,
	method: $MethodEnumType,
	disabled?: boolean,
};

const MethodAvatar = ({ classes = {}, method, disabled = false }: MethodAvatarPropsType): React$Element<*> => {
	const methodEnum = toMethodEnum(method);
	const className = `${methodEnum.toLowerCase()}Avatar`;
	if (!methodEnum) {
		// eslint-disable-next-line
		console.warn(`Method "${method}" is not allowed!`);
		return <div />;
	}
	if (!classes[className]) {
		// eslint-disable-next-line
		console.warn(`Color for ${methodEnum} not defined!`);
		return <div />;
	}
	return (
		<div>
			{/* $FlowFixMe */}
			<Avatar className={`${classes.avatar} ${classes[className]}${disabled ? ` ${classes.disabled}` : ''}`}>
				{methodEnum}
			</Avatar>
		</div>
	);
};

export default withStyles(styles)(MethodAvatar);
