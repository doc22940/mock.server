// @flow
/* eslint no-inline-comments: 0*/
import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Routes from './components/Routes/Routes';

import withRoot from './hoc/withRoot/withRoot';

import './App.css';

const styles = {
	root: {
		textAlign: 'center',
		paddingTop: 200,
	},
};

class App extends Component<*, *> {
	get name(): string {
		// const type: ButtonTypeType = 'primary';
		// eslint-disable-next-line
		// console.log('type', type);
		return 'App';
	}

	render(): React$Element<*> {
		return (
			<div className={styles.root}>
				<Routes />
			</div>
		);
	}
}

export default withRoot(withStyles(styles)(App));
