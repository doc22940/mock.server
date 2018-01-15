// @flow
/* eslint no-inline-comments: 0*/
/* eslint react/display-name: 0*/
import React from 'react';
import type { $MethodEnumType } from 'node-mock-server-utils';
import { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import InboxIcon from 'material-ui-icons/MoveToInbox';

import MoreMenu from '../../MoreMenu/MoreMenu';
import MethodAvatar from '../../../atoms/MethodAvatar/MethodAvatar';
import type { MoreMenuItemType } from '../../MoreMenu/MoreMenu';

export type EndpointsListItemPropsType = {
	title: string,
	subTitle?: string,
	method: $MethodEnumType,
	endpointId: string,
	onClick: () => void,
};

const EndpointsListItem = ({ title, method, onClick, subTitle = '' }: EndpointsListItemPropsType): React$Element<*> => {
	const menuItems: Array<MoreMenuItemType> = [
		{
			name: 'Delete',
			renderIcon: (): React$Element<*> => <InboxIcon />,
			onClick: () => {
				console.log('open file', method);
			},
		},
	];

	return (
		<ListItem button onClick={onClick}>
			<MethodAvatar method={method} />
			<ListItemText primary={title} secondary={subTitle === '' ? '-' : subTitle} />
			<ListItemSecondaryAction>
				<MoreMenu selected={'Delete'} ariaLabel={'More'} menuId={'long-menu'} menuItems={menuItems} />
			</ListItemSecondaryAction>
		</ListItem>
	);
};

EndpointsListItem.displayName = 'EndpointsListItem';

export default EndpointsListItem;
