// @flow
import type { StylesType } from '../../../types/styles';
import { METHODS_COLORS } from '../../../constants/methodsColors';

const styles = (): StylesType => ({
	avatar: {
		margin: 0,
		color: '#fff',
		fontSize: 9,
	},
	disabled: {
		opacity: 0.5,
	},
	getAvatar: {
		backgroundColor: METHODS_COLORS.GET,
	},
	deleteAvatar: {
		backgroundColor: METHODS_COLORS.DELETE,
	},
	postAvatar: {
		backgroundColor: METHODS_COLORS.POST,
	},
	putAvatar: {
		backgroundColor: METHODS_COLORS.PUT,
	},
	optionsAvatar: {
		backgroundColor: METHODS_COLORS.OPTIONS,
	},
	row: {
		display: 'flex',
		justifyContent: 'center',
	},
});

export default styles;
