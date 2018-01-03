// @flow

import React from 'react';
import { withRouter } from 'react-router';
import type { ContextRouter as ContextRouterType } from 'react-router';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import LibraryBooksIcon from 'material-ui-icons/LibraryBooks';
import CollectionsBookmarkIcon from 'material-ui-icons/CollectionsBookmark';
import ArchiveIcon from 'material-ui-icons/Archive';
import AssignmentTurnedInIcon from 'material-ui-icons/AssignmentTurnedIn';
import SettingsIcon from 'material-ui-icons/Settings';
import InfoIcon from 'material-ui-icons/Info';
import BugReportIcon from 'material-ui-icons/BugReport';
import ExtensionIcon from 'material-ui-icons/Extension';
import endpointIcon from '../../atoms/EndpointIcon/EndpointIcon';

export const MainItems = withRouter(({ history }: ContextRouterType): React$Element<*> => (
	<div>
		<ListItem button onClick={(): void => history.push('/')}>
			<ListItemIcon>{endpointIcon}</ListItemIcon>
			<ListItemText primary="Endpoints" />
		</ListItem>
		<ListItem button onClick={(): void => history.push('/models')}>
			<ListItemIcon>
				<LibraryBooksIcon />
			</ListItemIcon>
			<ListItemText primary="Models" />
		</ListItem>
		<ListItem button onClick={(): void => history.push('/collections')}>
			<ListItemIcon>
				<CollectionsBookmarkIcon />
			</ListItemIcon>
			<ListItemText primary="Collections" />
		</ListItem>
	</div>
));

export const ServiceItems = withRouter(({ history }: ContextRouterType): React$Element<*> => (
	<div>
		<ListItem button onClick={(): void => history.push('/importer')}>
			<ListItemIcon>
				<ArchiveIcon />
			</ListItemIcon>
			<ListItemText primary="Importer" />
		</ListItem>
		<ListItem button onClick={(): void => history.push('/validators')}>
			<ListItemIcon>
				<AssignmentTurnedInIcon />
			</ListItemIcon>
			<ListItemText primary="Validators" />
		</ListItem>
	</div>
));

export const SystemItems = withRouter(({ history }: ContextRouterType): React$Element<*> => (
	<div>
		<ListItem button onClick={(): void => history.push('/settings')}>
			<ListItemIcon>
				<SettingsIcon />
			</ListItemIcon>
			<ListItemText primary="Settings" />
		</ListItem>
		<ListItem button onClick={(): void => history.push('/plugins')}>
			<ListItemIcon>
				<ExtensionIcon />
			</ListItemIcon>
			<ListItemText primary="Plugins" />
		</ListItem>
		<ListItem button onClick={(): void => history.push('/about')}>
			<ListItemIcon>
				<InfoIcon />
			</ListItemIcon>
			<ListItemText primary="About" />
		</ListItem>
		<ListItem button onClick={(): void => history.push('/bug')}>
			<ListItemIcon>
				<BugReportIcon />
			</ListItemIcon>
			<ListItemText primary="Report bug" />
		</ListItem>
	</div>
));
