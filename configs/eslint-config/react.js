module.exports = {
	extends: [
		"@namics/eslint-config/configurations/es6-react.js",
		"@namics/eslint-config/configurations/es6-react-disable-styles.js",
		"@namics/eslint-config/configurations/flow.js",
		"@namics/eslint-config/configurations/flow-disable-styles.js"
	].map(require.resolve)
};
