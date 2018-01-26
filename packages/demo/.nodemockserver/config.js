'use strict';
const OpenInIdePlugin = require('node-mock-server-plugin-open-in-ide').default;

const config = {
	ui: {
		port: 3001,
	},
	restApi: {
		port: 3003,
	},
	plugins: [new OpenInIdePlugin()],
};

module.exports = config;
