// This file is shared across the demos.

import React from 'react';
import {withRouter} from 'react-router';
import type {ContextRouter as ContextRouterType} from 'react-router';
import {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import ShareIcon from 'material-ui-icons/Share';
import LibraryBooksIcon from 'material-ui-icons/LibraryBooks';
import CollectionsBookmarkIcon from 'material-ui-icons/CollectionsBookmark';
import ArchiveIcon from 'material-ui-icons/Archive';
import AssignmentTurnedInIcon from 'material-ui-icons/AssignmentTurnedIn';
import SettingsIcon from 'material-ui-icons/Settings';
import InfoIcon from 'material-ui-icons/Info';
import BugReportIcon from 'material-ui-icons/BugReport';
import ExtensionIcon from 'material-ui-icons/Extension';

export const MainItems = withRouter(({history}: ContextRouterType) => (
	<div>
		<ListItem button onClick={() => history.push('/')}>
			<ListItemIcon>
				<ShareIcon style={{transform: 'rotate(-90deg)'}} />
			</ListItemIcon>
			<ListItemText primary="Endpoints" />
		</ListItem>
		<ListItem button onClick={() => history.push('/models')}>
			<ListItemIcon>
				<LibraryBooksIcon />
			</ListItemIcon>
			<ListItemText primary="Models" />
		</ListItem>
		<ListItem button onClick={() => history.push('/collections')}>
			<ListItemIcon>
				<CollectionsBookmarkIcon />
			</ListItemIcon>
			<ListItemText primary="Collections" />
		</ListItem>
	</div>
));

export const ServiceItems = withRouter(({history}: ContextRouterType) => (
	<div>
		<ListItem button onClick={() => history.push('/importer')}>
			<ListItemIcon>
				<ArchiveIcon />
			</ListItemIcon>
			<ListItemText primary="Importer" />
		</ListItem>
		<ListItem button onClick={() => history.push('/validators')}>
			<ListItemIcon>
				<AssignmentTurnedInIcon />
			</ListItemIcon>
			<ListItemText primary="Validators" />
		</ListItem>
	</div>
));

export const SystemItems = withRouter(({history}: ContextRouterType) => (
	<div>
		<ListItem button onClick={() => history.push('/settings')}>
			<ListItemIcon>
				<SettingsIcon />
			</ListItemIcon>
			<ListItemText primary="Settings" />
		</ListItem>
		<ListItem button onClick={() => history.push('/plugins')}>
			<ListItemIcon>
				<ExtensionIcon />
			</ListItemIcon>
			<ListItemText primary="Plugins" />
		</ListItem>
		<ListItem button onClick={() => history.push('/about')}>
			<ListItemIcon>
				<InfoIcon />
			</ListItemIcon>
			<ListItemText primary="About" />
		</ListItem>
		<ListItem button onClick={() => history.push('/bug')}>
			<ListItemIcon>
				<BugReportIcon />
			</ListItemIcon>
			<ListItemText primary="Report bug" />
		</ListItem>
	</div>
));
