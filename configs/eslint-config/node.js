module.exports = {
	extends: [
		'@namics/eslint-config/configurations/es6-node.js',
		'@namics/eslint-config/configurations/es6-node-disable-styles.js',
		'@namics/eslint-config/configurations/flow.js',
		'@namics/eslint-config/configurations/flow-disable-styles.js',
	].map(require.resolve),
};
