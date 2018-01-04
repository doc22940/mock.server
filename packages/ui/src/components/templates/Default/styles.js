// @flow
/* eslint quote-props: 0*/
import type { ThemeType } from '../../../types/theme';
import type { StylesType } from '../../../types/styles';

export const drawerWidth: number = 240;

const styles = (theme: ThemeType): StylesType => ({
	root: {
		width: '100%',
		zIndex: 1,
	},
	rootOpen: {
		height: '100vh',
		overflow: 'hidden',
	},
	rootClosed: {
		height: '100%',
	},
	appFrame: {
		position: 'relative',
		display: 'flex',
		width: '100%',
		height: '100%',
	},
	appBar: {
		position: 'absolute',
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	'appBarShift-left': {
		marginLeft: drawerWidth,
	},
	'appBarShift-right': {
		marginRight: drawerWidth,
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 20,
	},
	hide: {
		display: 'none',
	},
	drawerPaper: {
		position: 'relative',
		height: '100%',
		width: drawerWidth,
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	content: {
		width: '100%',
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		height: 'calc(100% - 56px)',
		marginTop: 56,
		[theme.breakpoints.up('sm')]: {
			content: {
				height: 'calc(100% - 64px)',
				marginTop: 64,
			},
		},
	},
	'content-left': {
		marginLeft: -drawerWidth,
	},
	'content-right': {
		marginRight: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	'contentShift-left': {
		marginLeft: 0,
	},
	'contentShift-right': {
		marginRight: 0,
	},
});

export default styles;
