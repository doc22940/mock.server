"use strict";

const fs = require("fs");
const chalk = require("chalk");
const paths = require("../config/paths");

module.exports = (resolve, rootDir) => {
	const setupTestsFile = fs.existsSync(paths.testsSetup) ? "<rootDir>/__tests__/setup.js" : undefined;

	const config = {
		collectCoverageFrom: ["src/**/*.{js,jsx}"],
		setupFiles: [resolve("config/polyfills.js")],
		setupTestFrameworkScriptFile: setupTestsFile,
		testMatch: ["<rootDir>/src/**/__tests__/**/*.js?(x)", "<rootDir>/src/**/?(*.)(spec|test).js?(x)"],
		testEnvironment: "node",
		testURL: "http://localhost",
		transform: {
			"^.+\\.(js|jsx)$": resolve("jest/babel-transform.js"),
			"^.+\\.css$": resolve("jest/css-transform.js"),
			"^(?!.*\\.(js|jsx|css|json)$)": resolve("jest/file-transform.js")
		},
		transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"],
		moduleNameMapper: {
			"^react-native$": "react-native-web"
		},
		moduleFileExtensions: ["web.js", "js", "json", "web.jsx", "jsx", "node"]
	};
	if (rootDir) {
		config.rootDir = rootDir;
	}
	const overrides = Object.assign({}, require(paths.appPackageJson).jest);
	const supportedKeys = ["collectCoverageFrom", "coverageReporters", "coverageThreshold", "snapshotSerializers"];
	if (overrides) {
		supportedKeys.forEach(key => {
			if (overrides.hasOwnProperty(key)) {
				config[key] = overrides[key];
				delete overrides[key];
			}
		});
	}
	return config;
};
