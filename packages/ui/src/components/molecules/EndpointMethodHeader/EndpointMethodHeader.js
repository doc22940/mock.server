// @flow
/* eslint no-inline-comments: 0*/
/* eslint react/prefer-stateless-function: 0*/
/* eslint react/display-name: 0*/

import React from 'react';
import { observer, inject } from 'mobx-react';

// material-ui
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader } from 'material-ui/Card';

// project packages
import type { $MethodEnumType } from 'node-mock-server-utils';

// internal
import RootStore from '../../../stores/RootStore';
import styles from './styles';
import MethodAvatar from '../../atoms/MethodAvatar/MethodAvatar';
import MoreMenu from '../MoreMenu/MoreMenu';
import { renderIcon } from '../../atoms/Icon/Icon';
import type { ClassesType } from '../../../types/classes';
import type { MoreMenuItemType } from '../MoreMenu/MoreMenu';
import type { HeaderActionType } from '../../../stores/HooksStore';

// flow types
export type EndpointMethodHeaderPropsType = {
	rootStore: RootStore,
	classes?: ClassesType,
	method: $MethodEnumType,
	endpointId: string,
	title: string,
	subTitle?: string,
};

class EndpointMethodHeader extends React.Component<EndpointMethodHeaderPropsType> {
	get menuItems(): Array<MoreMenuItemType> {
		const items = this.props.rootStore.hooksStore.endpointMethodView.headerActions.map(
			({ name, onClick, icon }: HeaderActionType): MoreMenuItemType => {
				return {
					name,
					renderIcon: (): ?React$Element<*> => (icon ? renderIcon(icon) : undefined),
					onClick: (): void => onClick(this.props.endpointId, this.props.method),
				};
			}
		);
		return items;
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

export default inject('rootStore')(withStyles(styles)(observer(EndpointMethodHeader)));
