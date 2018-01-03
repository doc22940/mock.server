// @flow
/* eslint no-inline-comments: 0*/
import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { Provider } from 'mobx-react';

import Routes from './components/organisms/Routes/Routes';

import withRoot from './hoc/withRoot/withRoot';
import EndpointsStore from './stores/EndpointsStore';

export type StoresType = {
	endpointsStore: EndpointsStore,
};

const stores: StoresType = {
	endpointsStore: new EndpointsStore(),
};

const styles = {
	root: {
		textAlign: 'center',
		paddingTop: 200,
	},
};

class App extends Component<*, *> {
	componentDidMount() {
		// stores.endpointsStore.fetch();
	}

	render(): React$Element<*> {
		return (
			<Provider {...stores}>
				<div className={styles.root}>
					<Routes />
				</div>
			</Provider>
		);
	}
}
export default withRoot(withStyles(styles)(App));
