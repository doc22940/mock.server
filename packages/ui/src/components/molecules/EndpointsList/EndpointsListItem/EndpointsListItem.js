// @flow
/* eslint no-inline-comments: 0*/

import React from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import EndpointContextMenu from '../../EndpointContextMenu/EndpointContextMenu';
import endpointIcon from '../../../atoms/EndpointIcon/EndpointIcon';

export type EndpointsListItemPropsType = {
	title: string,
	subTitle?: string,
	onClick: () => void,
};

const menuItems: Array<Object> = [
	{
		name: 'Delete',
		icon: 'Delete',
		onClick: () => {},
	},
	{
		name: 'Favorite',
		icon: 'Favorite',
		onClick: () => {},
	},
];

const EndpointsListItem = ({ title, subTitle, onClick }: EndpointsListItemPropsType): React$Element<*> => {
	return (
		<ListItem button onClick={onClick}>
			<Avatar>{endpointIcon}</Avatar>
			<ListItemText primary={title} secondary={subTitle} />
			<ListItemSecondaryAction>
				<EndpointContextMenu menuItems={menuItems} />
			</ListItemSecondaryAction>
		</ListItem>
	);
};

EndpointsListItem.displayName = 'EndpointsListItem';

export default EndpointsListItem;
