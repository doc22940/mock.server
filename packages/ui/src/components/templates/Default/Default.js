// @flow
/* eslint flowtype/require-return-type: 0*/
/* eslint no-inline-comments: 0*/

import React from 'react';
import {withStyles} from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import {MainItems, ServiceItems, SystemItems} from './tileData';
import styles from './styles';
import type {ThemeType} from '../../../types/theme';
import type {ClassesType} from '../../../types/classes';

export type TemplateDefaultPropsType = {
	classes?: ClassesType,
	theme?: ThemeType,
	children: React$Node,
};
export type TemplateDefaultStateType = {
	open: boolean,
};

class TemplateDefault extends React.Component<TemplateDefaultPropsType, TemplateDefaultStateType> {
	static displayName = 'TemplateDefault';

	state = {
		open: false,
	};

	handleDrawerOpen = () => {
		this.setState({open: true});
	};

	handleDrawerClose = () => {
		this.setState({open: false});
	};

	render() {
		const {classes = {}, theme = {}, children} = this.props;
		const {open} = this.state;
		const anchor = 'left';

		const drawer = (
			<Drawer
				type="persistent"
				classes={{
					paper: classes.drawerPaper,
				}}
				anchor={anchor}
				open={open}
			>
				<div className={classes.drawerInner}>
					<div className={classes.drawerHeader}>
						<IconButton onClick={this.handleDrawerClose}>
							{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
						</IconButton>
					</div>
					<div>
						<Divider />
						{/* $FlowFixMe */}
						<List className={classes.list}>
							<MainItems />
						</List>
						<Divider />
						{/* $FlowFixMe */}
						<List className={classes.list}>
							<ServiceItems />
						</List>
						<Divider />
						{/* $FlowFixMe */}
						<List className={classes.list}>
							<SystemItems />
						</List>
					</div>
				</div>
			</Drawer>
		);

		return (
			<div
				className={classNames(classes.root, {
					[classes.rootOpen]: open,
					[classes.rootClosed]: !open,
				})}
			>
				<div className={classes.appFrame}>
					<AppBar
						className={classNames(classes.appBar, {
							[classes.appBarShift]: open,
							[classes[`appBarShift-${anchor}`]]: open,
						})}
					>
						<Toolbar disableGutters={!open}>
							<IconButton
								color="contrast"
								aria-label="open drawer"
								onClick={this.handleDrawerOpen}
								className={classNames(classes.menuButton, open && classes.hide)}
							>
								<MenuIcon />
							</IconButton>
							<Typography type="title" color="inherit" noWrap>
								Node Mock Server
							</Typography>
						</Toolbar>
					</AppBar>
					{drawer}
					<main
						className={classNames(classes.content, classes[`content-${anchor}`], {
							[classes.contentShift]: open,
							[classes[`contentShift-${anchor}`]]: open,
						})}
					>
						{children}
					</main>
				</div>
			</div>
		);
	}
}

export default withStyles(styles, {withTheme: true})(TemplateDefault);
