// @flow
/* eslint no-inline-comments: 0*/

import React from 'react';
import type { $MethodEnumType } from 'node-mock-server-utils';
import { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import EndpointContextMenu from '../../EndpointContextMenu/EndpointContextMenu';
import MethodAvatar from '../../../atoms/MethodAvatar/MethodAvatar';

export type EndpointsListItemPropsType = {
	title: string,
	subTitle?: string,
	method: $MethodEnumType,
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

const EndpointsListItem = ({ title, method, onClick, subTitle = '' }: EndpointsListItemPropsType): React$Element<*> => {
	return (
		<ListItem button onClick={onClick}>
			<MethodAvatar method={method} />
			<ListItemText primary={title} secondary={subTitle === '' ? '-' : subTitle} />
			<ListItemSecondaryAction>
				<EndpointContextMenu menuItems={menuItems} />
			</ListItemSecondaryAction>
		</ListItem>
	);
};

EndpointsListItem.displayName = 'EndpointsListItem';

export default EndpointsListItem;
