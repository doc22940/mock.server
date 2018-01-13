// @flow
import type { ThemeType } from '../../../types/theme';
import type { StylesType } from '../../../types/styles';

const styles = (theme: ThemeType): StylesType => ({
	card: {
		margin: theme.spacing.unit * 3,
	},
});

export default styles;
