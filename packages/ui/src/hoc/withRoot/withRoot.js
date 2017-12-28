// @flow
/* globals process*/

import React from 'react';
import type {ComponentType} from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import {withStyles, MuiThemeProvider} from 'material-ui/styles';
import wrapDisplayName from 'recompose/wrapDisplayName';
import createContext from '../../styles/createContext';

export type ThemeType = {
	palette: {
		background: {
			default: string,
		},
	},
};
export type StylesReturnType = {};

// Apply some reset
const styles = (theme: ThemeType): StylesReturnType => ({
	'@global': {
		html: {
			background: theme.palette.background.default,
			WebkitFontSmoothing: 'antialiased',
			MozOsxFontSmoothing: 'grayscale',
		},
		body: {
			margin: 0,
		},
	},
});

const AppWrapperPre = (props: {children: React$Node}): React$Node => props.children;
const AppWrapper = withStyles(styles)(AppWrapperPre);

const context = createContext();

function withRoot(Component: ComponentType<*>): React$ComponentType<*> {
	class WithRoot extends React.Component<*> {
		componentDidMount() {
			// Remove the server-side injected CSS.
			const jssStyles = document.querySelector('#jss-server-side');
			if (jssStyles && jssStyles.parentNode) {
				jssStyles.parentNode.removeChild(jssStyles);
			}
		}

		render(): React$Element<*> {
			return (
				<JssProvider
					registry={context.sheetsRegistry}
					jss={context.jss}
					generateClassName={context.generateClassName}
				>
					<MuiThemeProvider theme={context.theme} sheetsManager={context.sheetsManager}>
						<AppWrapper>
							<Component />
						</AppWrapper>
					</MuiThemeProvider>
				</JssProvider>
			);
		}
	}

	if (process.env.NODE_ENV !== 'production') {
		WithRoot.displayName = wrapDisplayName(Component, 'withRoot');
	}

	return WithRoot;
}

export default withRoot;
