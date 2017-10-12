/* eslint global-require: 0*/
/* eslint no-console: 0*/
/* eslint prefer-rest-params: 0*/
"use strict";

function getTimestamp() {
	const date = new Date();
	return `${date.toLocaleTimeString()}`;
}
function log(...args) {
	console.log(`[${getTimestamp()}] `, ...args);
}
function error(...args) {
	console.error(`[${getTimestamp()}] `, ...args);
}

module.exports = {
	log,
	error,
};
