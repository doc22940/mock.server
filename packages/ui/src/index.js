// @flow

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
// import registerServiceWorker from "./registerServiceWorker";

const domNode = document.getElementById('root');

if (domNode !== null) {
	ReactDOM.render(<App />, domNode);
}

// registerServiceWorker();
