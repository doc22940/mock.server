// @flow
/* eslint quote-props: 0*/
import type { ThemeType } from '../../../types/theme';
import type { StylesType } from '../../../types/styles';

const styles = (theme: ThemeType): StylesType => ({
	menuItem: {
		'&:focus': {
			backgroundColor: theme.palette.primary[500],
			'& $text, & $icon': {
				color: theme.palette.common.white,
			},
		},
	},
	text: {},
	icon: {},
});

export default styles;
