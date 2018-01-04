// @flow
import { useStrict } from 'mobx';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
// import registerServiceWorker from "./registerServiceWorker";

useStrict(true);

const domNode = document.getElementById('root');

if (domNode !== null) {
	ReactDOM.render(<App />, domNode);
}

// registerServiceWorker();
