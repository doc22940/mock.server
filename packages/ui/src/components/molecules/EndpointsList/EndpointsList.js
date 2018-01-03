// @flow
/* eslint no-inline-comments: 0*/

import React from 'react';
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';
import type { ThemeType } from '../../../types/theme';
import type { StylesType } from '../../../types/styles';
import type { ClassesType } from '../../../types/classes';
import _EndpointsListItem from './EndpointsListItem/EndpointsListItem';

export type EndpointsListPropsType = {
	children: React$Node,
	classes?: ClassesType,
};

const styles = (theme: ThemeType): StylesType => ({
	root: {
		width: '100%',
		background: theme.palette.background.paper,
	},
});

const EndpointsList = ({ children, classes = {} }: EndpointsListPropsType): React$Element<*> => {
	return (
		<div className={classes.root}>
			{/* $FlowFixMe */}
			<List>{children}</List>
		</div>
	);
};

EndpointsList.displayName = 'EndpointsList';

export const EndpointsListItem = _EndpointsListItem;
export default withStyles(styles)(EndpointsList);
