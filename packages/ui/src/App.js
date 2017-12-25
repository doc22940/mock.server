// @flow
/* eslint no-inline-comments: 0*/
import React, {Component} from 'react';

class App extends Component<*, *> {
	get name(): string {
		// const type: ButtonTypeType = 'primary';
		// eslint-disable-next-line
		// console.log('type', type);
		return 'App';
	}

	render(): React$Element<*> {
		return <div className="App" />;
	}
}

export default App;
