// @flow
/* eslint no-inline-comments: 0*/
import React from 'react';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import MoreVertIcon from 'material-ui-icons/MoreVert';

const ITEM_HEIGHT = 48;

export type EndpointContextMenuItemType = {
	name: string,
	icon?: string,
	onClick: () => void,
};
export type EndpointContextMenuPropsType = {
	menuItems: Array<EndpointContextMenuItemType>,
};
export type EndpointContextMenuStateType = {
	anchorEl: null | HTMLButtonElement,
};

class EndpointContextMenu extends React.Component<EndpointContextMenuPropsType, EndpointContextMenuStateType> {
	static displayName = 'EndpointContextMenu';

	state = {
		anchorEl: null,
	};

	handleClick = (event: SyntheticEvent<HTMLButtonElement>) => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	render(): React$Element<*> {
		const { menuItems } = this.props;
		const open = Boolean(this.state.anchorEl);

		return (
			<div>
				<IconButton
					aria-label="More"
					aria-owns={open ? 'long-menu' : null}
					aria-haspopup="true"
					onClick={this.handleClick}
				>
					<MoreVertIcon />
				</IconButton>
				{/* $FlowFixMe */}
				<Menu
					id="long-menu"
					anchorEl={this.state.anchorEl}
					open={open}
					onClose={this.handleClose}
					PaperProps={{
						style: {
							maxHeight: ITEM_HEIGHT * 4.5,
							width: 200,
						},
					}}
				>
					{menuItems.map(({ name }: EndpointContextMenuItemType): React$Element<*> => (
						<MenuItem key={name} selected={name === 'Delete'} onClick={this.handleClose}>
							{name}
						</MenuItem>
					))}
				</Menu>
			</div>
		);
	}
}

export default EndpointContextMenu;
