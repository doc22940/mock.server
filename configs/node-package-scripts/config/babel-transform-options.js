"use strict";

module.exports = {
	presets: [require.resolve("babel-preset-react-app"), require.resolve("babel-preset-stage-0")],
	babelrc: false,
	plugins: [require.resolve("babel-plugin-transform-decorators-legacy")]
};
