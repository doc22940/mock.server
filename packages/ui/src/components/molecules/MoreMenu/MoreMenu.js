// @flow
/* eslint no-inline-comments: 0*/
import React from 'react';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import styles from './styles';
import type { ClassesType } from '../../../types/classes';

const ITEM_HEIGHT = 48;

export type MoreMenuItemType = {
	name: string,
	renderIcon?: () => React$Node,
	onClick: () => void,
};
export type MoreMenuPropsType = {
	menuItems: Array<MoreMenuItemType>,
	ariaLabel: string,
	menuId: string,
	selected?: string,
	classes?: ClassesType,
};
export type MoreMenuStateType = {
	anchorEl: null | HTMLButtonElement,
};

class MoreMenu extends React.Component<MoreMenuPropsType, MoreMenuStateType> {
	static displayName = 'MoreMenu';

	state = {
		anchorEl: null,
	};

	handleClick = (event: SyntheticEvent<HTMLButtonElement>) => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	handleClickItemFactory = (onClick: () => void): (() => void) => {
		return () => {
			onClick();
			this.handleClose();
		};
	};

	render(): React$Element<*> {
		const { menuItems, ariaLabel, menuId, selected, classes = {} } = this.props;
		const open = Boolean(this.state.anchorEl);

		return (
			<div>
				<IconButton
					aria-label={ariaLabel}
					aria-owns={open ? menuId : null}
					aria-haspopup="true"
					onClick={this.handleClick}
				>
					<MoreVertIcon />
				</IconButton>
				{/* $FlowFixMe */}
				<Menu
					id={menuId}
					anchorEl={this.state.anchorEl}
					open={open}
					onClose={this.handleClose}
					PaperProps={{
						style: {
							maxHeight: ITEM_HEIGHT * 4.5,
							width: 250,
						},
					}}
				>
					{menuItems.map(({ name, renderIcon, onClick }: MoreMenuItemType): React$Element<*> => {
						return (
							<MenuItem
								key={name}
								selected={name === selected}
								onClick={this.handleClickItemFactory(onClick)}
							>
								{renderIcon && (
									<span>
										{/* $FlowFixMe */}
										<ListItemIcon className={classes.icon}>{renderIcon()}</ListItemIcon>
									</span>
								)}
								<ListItemText classes={{ text: classes.text }} inset primary={name} />
							</MenuItem>
						);
					})}
				</Menu>
			</div>
		);
	}
}

export default withStyles(styles)(MoreMenu);
