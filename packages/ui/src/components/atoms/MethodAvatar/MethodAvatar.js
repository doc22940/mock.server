// @flow
/* eslint no-inline-comments: 0*/

import React from 'react';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import lightBlue from 'material-ui/colors/lightBlue';
import lightGreen from 'material-ui/colors/lightGreen';
import orange from 'material-ui/colors/orange';
import red from 'material-ui/colors/red';
import purple from 'material-ui/colors/purple';
import type { $MethodEnumType } from 'node-mock-server-utils';
import { toMethodEnum } from 'node-mock-server-utils';
import type { StylesType } from '../../../types/styles';
import type { ClassesType } from '../../../types/classes';

const styles: StylesType = {
	avatar: {
		margin: 0,
		color: '#fff',
		fontSize: 9,
	},
	disabled: {
		opacity: 0.5,
	},
	getAvatar: {
		backgroundColor: lightBlue[500],
	},
	deleteAvatar: {
		backgroundColor: red[500],
	},
	postAvatar: {
		backgroundColor: lightGreen[500],
	},
	putAvatar: {
		backgroundColor: orange[500],
	},
	optionsAvatar: {
		backgroundColor: purple[500],
	},
	row: {
		display: 'flex',
		justifyContent: 'center',
	},
};

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
	if (!styles[className]) {
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
