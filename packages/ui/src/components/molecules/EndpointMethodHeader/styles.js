// @flow
import type { ThemeType } from '../../../types/theme';
import type { StylesType } from '../../../types/styles';

const styles = (theme: ThemeType): StylesType => ({
	card: {
		marginTop: theme.spacing.unit * 3,
		marginBottom: theme.spacing.unit * 3,
	},
});

export default styles;