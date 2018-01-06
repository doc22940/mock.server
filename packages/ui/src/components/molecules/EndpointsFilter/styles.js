// @flow
import type { ThemeType } from '../../../types/theme';
import type { StylesType } from '../../../types/styles';

const styles = (theme: ThemeType): StylesType => ({
	root: {
		width: '100%',
	},
	panel: {
		margin: theme.spacing.unit * 3,
	},
	panelExpanded: {
		margin: `${theme.spacing.unit * 3}px !important`,
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		flexBasis: '33.33%',
		flexShrink: 0,
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
	},
	textField: {
		marginTop: 0,
		marginLeft: 0,
		marginRight: 0,
		width: '100%',
	},
	methodSelector: {
		width: '100%',
		padding: 0,
		margin: `${theme.spacing.unit * 2}px 0 0 -${theme.spacing.unit * 2}px`,
		listStyleType: 'none',
	},
	methodSelectorItem: {
		float: 'left',
		marginLeft: theme.spacing.unit,
	},
});

export default styles;
