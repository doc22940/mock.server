// @flow
/* eslint no-inline-comments: 0*/

import React from 'react';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import deepOrange from 'material-ui/colors/deepOrange';
import deepPurple from 'material-ui/colors/deepPurple';
import lightGreen from 'material-ui/colors/lightGreen';
import type { StylesType } from '../../../types/styles';
import type { ClassesType } from '../../../types/classes';

const styles: StylesType = {
	avatar: {
		margin: 10,
		color: '#fff',
		fontSize: 10,
	},
	getAvatar: {
		backgroundColor: lightGreen[500],
	},
	deleteAvatar: {
		backgroundColor: deepOrange[500],
	},
	postAvatar: {
		backgroundColor: deepPurple[500],
	},
	row: {
		display: 'flex',
		justifyContent: 'center',
	},
};

export type MethodAvatarPropsType = {
	classes?: ClassesType,
	method: string,
};

const MethodAvatar = ({ classes = {}, method }: MethodAvatarPropsType): React$Element<*> => {
	const className = `${method.toLowerCase()}Avatar`;
	if (!styles[className]) {
		return <div />;
	}
	return (
		<div>
			{/* $FlowFixMe */}
			<Avatar className={`${classes.avatar} ${classes[className]}`}>{method.toUpperCase()}</Avatar>
		</div>
	);
};

export default withStyles(styles)(MethodAvatar);
