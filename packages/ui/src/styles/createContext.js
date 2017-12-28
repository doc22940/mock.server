// @flow

import {create, SheetsRegistry} from 'jss';
import preset from 'jss-preset-default';
import {createMuiTheme, createGenerateClassName} from 'material-ui/styles';
import {purple, green} from 'material-ui/colors';

export type CreateContextReturnType = {
	jss: Object,
	theme: Object,
	sheetsManager: Object,
	sheetsRegistry: Object,
	generateClassName: Object,
};

const theme = createMuiTheme({
	palette: {
		primary: purple,
		secondary: green,
	},
});

// Configure JSS
const jss = create(preset());

export const sheetsManager: Map<*, *> = new Map();

export default function createContext(): CreateContextReturnType {
	return {
		jss,
		theme,
		// This is needed in order to deduplicate the injection of CSS in the page.
		sheetsManager,
		// This is needed in order to inject the critical CSS.
		sheetsRegistry: new SheetsRegistry(),
		generateClassName: createGenerateClassName(),
	};
}
