// @flow
/* eslint no-inline-comments: 0*/
import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { Provider } from 'mobx-react';

import Routes from './components/organisms/Routes/Routes';
import RootStore from './stores/RootStore';
import withRoot from './hoc/withRoot/withRoot';

const styles = {
	root: {
		// width: '100%',
		// display: 'flex',
		// minHeight: '100vh',
		// alignItems: 'stretch',
	},
};

class App extends Component<*, *> {
	componentDidMount() {
		// stores.endpointsStore.fetch();
	}

	render(): React$Element<*> {
		return (
			<Provider rootStore={new RootStore()}>
				<div className={this.props.classes.root}>
					<Routes />
				</div>
			</Provider>
		);
	}
}
export default withRoot(withStyles(styles)(App));
