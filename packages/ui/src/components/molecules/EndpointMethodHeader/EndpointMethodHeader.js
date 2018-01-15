// @flow
/* eslint no-inline-comments: 0*/
/* eslint react/prefer-stateless-function: 0*/
/* eslint react/display-name: 0*/

import React from 'react';

// material-ui
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader } from 'material-ui/Card';
import InsertDriveFileIcon from 'material-ui-icons/InsertDriveFile';

// project packages
import type { $MethodEnumType } from 'node-mock-server-utils';

// internal
import styles from './styles';
import MethodAvatar from '../../atoms/MethodAvatar/MethodAvatar';
import MoreMenu from '../MoreMenu/MoreMenu';
import type { ClassesType } from '../../../types/classes';
import type { MoreMenuItemType } from '../MoreMenu/MoreMenu';

// flow types
export type EndpointMethodHeaderPropsType = {
	classes?: ClassesType,
	method: $MethodEnumType,
	endpointId: string,
	title: string,
	subTitle?: string,
};

class EndpointMethodHeader extends React.Component<EndpointMethodHeaderPropsType> {
	get menuItems(): Array<MoreMenuItemType> {
		return [
			{
				name: 'Open endpoint file',
				renderIcon: (): React$Element<*> => <InsertDriveFileIcon />,
				onClick: () => {
					console.log('open file', this.props.endpointId, this.props.method);
				},
			},
		];
	}

	render(): React$Element<*> {
		const { classes = {}, method, title, subTitle } = this.props;

		return (
			<div>
				{/* $FlowFixMe */}
				<Card className={classes.card}>
					<CardHeader
						avatar={<MethodAvatar method={method} />}
						action={<MoreMenu ariaLabel={'More'} menuId={'long-menu'} menuItems={this.menuItems} />}
						title={title}
						subheader={subTitle === '' ? '-' : subTitle}
					/>
				</Card>
			</div>
		);
	}
}

export default withStyles(styles)(EndpointMethodHeader);
