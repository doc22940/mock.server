// @flow
/* eslint no-inline-comments: 0*/
/* eslint react/prefer-stateless-function: 0*/
import React from 'react';

// material-ui
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui-icons/MoreVert';

// project packages
import type { $MethodEnumType } from 'node-mock-server-utils';

// internal
import styles from './styles';
import MethodAvatar from '../../atoms/MethodAvatar/MethodAvatar';
import type { ClassesType } from '../../../types/classes';

// flow types
export type EndpointMethodHeaderPropsType = {
	classes?: ClassesType,
	method: $MethodEnumType,
	title: string,
	subTitle?: string,
};

class EndpointMethodHeader extends React.Component<EndpointMethodHeaderPropsType> {
	render(): React$Element<*> {
		const { classes = {}, method, title, subTitle } = this.props;
		return (
			<div>
				{/* $FlowFixMe */}
				<Card className={classes.card}>
					<CardHeader
						avatar={<MethodAvatar method={method} />}
						action={
							<IconButton>
								<MoreVertIcon />
							</IconButton>
						}
						title={title}
						subheader={subTitle}
					/>
				</Card>
			</div>
		);
	}
}

export default withStyles(styles)(EndpointMethodHeader);
