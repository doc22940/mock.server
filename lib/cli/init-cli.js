/* eslint no-console: 0 */
var path = require('path');
var log = require('chip')();
var inquirer = require('inquirer');
var jQueryExtend = require('extend');
var Promise = require('es6-promise-polyfill').Promise;
var pSeries = require('p-series');
var Utils = require('../Utils');
var defaultOptions = require('../defaults/options-defaults');

var utils = new Utils();

function askForSSL() {
	return new Promise((resolve) => {
		inquirer.prompt([
			{
				type: 'list',
				name: 'ssl',
				choices: ['Yes', 'No'],
				message: 'Want to use SSL?',
				default: 'Yes',
			},
		]).then(function (answers) {
			if (answers.ssl.toUpperCase() === 'NO') {
				resolve({});
				return;
			}

			inquirer.prompt([
				{
					type: 'input',
					name: 'privateKey',
					message: 'Enter the desired path (from the mock server directory) to the "private key" file',
				},
				{
					type: 'input',
					name: 'certificate',
					message: 'Enter the desired path (from the mock server directory) to the "certificate" file',
				},
			]).then(resolve);
		});
	});
}
function askForPath() {
	return new Promise((resolve) => {
		inquirer.prompt([
			{
				type: 'input',
				name: 'path',
				message: 'Enter the desired path (from your current directory) to store the mock server data',
				default: 'mock',
			},
		]).then(function (answers) {
			resolve(answers);
		});
	});
}
function askForDefaultConfig() {
	return new Promise((resolve, reject) => {
		inquirer.prompt([
			{
				type: 'list',
				name: 'defaultConfig',
				choices: ['Yes', 'No'],
				message: 'Do you want to use the default configuration?',
				default: 'Yes',
			},
		]).then(function (answers) {
			if (answers.defaultConfig.toUpperCase() === 'YES') {
				reject();
				return;
			}
			resolve({});
		});
	});
}
function askForNaming() {
	return new Promise((resolve) => {
		inquirer.prompt([
			{
				type: 'input',
				name: 'title',
				message: 'Enter the title of the API',
				default: 'Api mock server',
			},
			{
				type: 'input',
				name: 'version',
				message: 'Enter the version number of the API',
				default: '1',
			},
		]).then(resolve);
	});
}
function askForUrlSettings() {
	return new Promise((resolve) => {
		inquirer.prompt([
			{
				type: 'input',
				name: 'urlBase',
				message: 'Enter the url under which the server should be accessible (just protocol, host and port)',
				default: 'http://localhost:3001',
			},
			{
				type: 'input',
				name: 'urlPath',
				message: 'Enter the url path under which the server should be accessible',
				default: '/rest/v1',
			},
			{
				type: 'input',
				name: 'port',
				message: 'Enter the url port which the server should be accessible',
				default: '3001',
			},
			{
				type: 'input',
				name: 'uiPath',
				message: 'Enter the url path under which the UI should be accessible',
				default: '/',
			},
		]).then(resolve);
	});
}
function askForFuncPath() {
	return new Promise((resolve) => {
		inquirer.prompt([
			{
				type: 'input',
				name: 'funcPath',
				message: 'Enter the desired path (from the mock server directory) to store the mock functions',
				default: '/func',
			},
		]).then(resolve);
	});
}
function askForHeader(headerCallback) {
	inquirer.prompt([
		{
			type: 'input',
			name: 'name',
			message: 'Enter response header key',
		},
		{
			type: 'input',
			name: 'value',
			message: 'Enter response header value',
		},
	]).then(function (headerAnswer) {
		var headers = {};
		headers[headerAnswer.name] = headerAnswer.value;
		headerCallback(headers);
	});
}
function askForAddHeader(headers, headerCallback) {
	inquirer.prompt([
		{
			type: 'list',
			name: 'addHeader',
			choices: ['Yes', 'No'],
			message: 'Do you want to add another response header?',
			default: 'Yes',
		},
	]).then(function (answers) {
		if (answers.addHeader.toUpperCase() === 'YES') {
			askForHeader(function (headerResult) {
				headers = jQueryExtend(true, headers, headerResult);
				askForAddHeader(headers, headerCallback);
			});
			return;
		}
		headerCallback({ headers: headers });
	});
}
function askForHeaders() {
	return new Promise((resolve) => {
		inquirer.prompt([
			{
				type: 'list',
				choices: ['Yes', 'No'],
				name: 'useDefaultHeaders',
				message: 'Do you want to use the default response headers?',
				default: 'Yes',
			},
		]).then(function (answers) {
			if (answers.useDefaultHeaders.toUpperCase() === 'YES') {
				resolve({
					contentType: defaultOptions.contentType,
					accessControlExposeHeaders: defaultOptions.accessControlExposeHeaders,
					accessControlAllowOrigin: defaultOptions.accessControlAllowOrigin,
					accessControlAllowMethods: defaultOptions.accessControlAllowMethods,
					accessControlAllowHeaders: defaultOptions.accessControlAllowHeaders,
				});
				return;
			}
			inquirer.prompt([
				{
					type: 'input',
					name: 'contentType',
					message: 'Enter "Content-Type" response header',
					default: 'application/json',
				},
				{
					type: 'input',
					name: 'accessControlExposeHeaders',
					message: 'Enter "Access-Control-Expose-Headers" response header',
					default: 'X-Total-Count',
				},
				{
					type: 'input',
					name: 'accessControlAllowOrigin',
					message: 'Enter "Access-Control-Allow-Origin" response header',
					default: '*',
				},
				{
					type: 'input',
					name: 'accessControlAllowMethods',
					message: 'Enter "Access-Control-Allow-Methods" response header',
					default: 'GET, POST, PUT, OPTIONS, DELETE, PATCH, HEAD',
				},
				{
					type: 'input',
					name: 'accessControlAllowHeaders',
					message: 'Enter "Access-Control-Allow-Headers" response header',
					default: 'origin, x-requested-with, content-type',
				},
			]).then(function (answersOtherHeaders) {
				askForAddHeader({}, function (answerHeaders) {
					resolve(jQueryExtend(true, answerHeaders, answersOtherHeaders));
				});
			});
		});
	});
}
function askForSwaggerImport() {
	return new Promise((resolve) => {
		inquirer.prompt([
			{
				type: 'list',
				choices: ['Yes', 'No'],
				name: 'useSwaggerImport',
				message: 'Do you want to use the swagger import?',
				default: 'No',
			},
		]).then(function (answers) {
			console.log('');
			console.log('/**');
			console.log(' *  To import schemas from swagger you need to provide the url to the swagger api json file.');
			console.log(' *  In case of you want to import the schemas from "http://petstore.swagger.io/".');
			console.log(' *  You need to provide this url: http://petstore.swagger.io/v2/swagger.json');
			console.log('**/');
			console.log('');
			if (answers.useSwaggerImport.toUpperCase() === 'NO') {
				resolve({});
				return;
			}
			inquirer.prompt([
				{
					type: 'input',
					name: 'protocol',
					message: 'Enter the swagger url protocol',
					default: 'http',
				},
				{
					type: 'input',
					name: 'authUser',
					message: 'Enter the swagger url basic auth user name',
				},
				{
					type: 'input',
					name: 'authPass',
					message: 'Enter the swagger url basic auth password',
				},
				{
					type: 'input',
					name: 'host',
					message: 'Enter the swagger url host',
					default: 'petstore.swagger.io',
				},
				{
					type: 'input',
					name: 'port',
					message: 'Enter the swagger url port',
					default: '80',
				},
				{
					type: 'input',
					name: 'path',
					message: 'Enter the swagger url path',
					default: '/v2/swagger.json',
				},
				{
					type: 'input',
					name: 'replacePathsStr',
					message: 'Enter the part of the endpoints which should be removed (if needed)',
				},
				{
					type: 'confirm',
					name: 'createErrorFile',
					message: 'Write error response files while importing?',
					default: true,
				},
				{
					type: 'confirm',
					name: 'createEmptyFile',
					message: 'Write empty response files while importing?',
					default: true,
				},
				{
					type: 'confirm',
					name: 'overwriteExistingDescriptions',
					message: 'Overwrite existing descriptions?',
					default: true,
				},
				{
					type: 'input',
					name: 'responseFuncPath',
					message: 'Enter the desired path (from the mock server directory) to store the imported mock functions',
					default: 'func-imported',
				},
				{
					type: 'input',
					name: 'customDTOToClassTemplate',
					message: 'Enter the path to a custom "DTO to class" template',
				},
			]).then(function (answersSwaggerImport) {
				if (answersSwaggerImport.authUser === '') {
					delete answersSwaggerImport.authUser;
				}
				if (answersSwaggerImport.authPass === '') {
					delete answersSwaggerImport.authPass;
				}
				if (answersSwaggerImport.customDTOToClassTemplate === '') {
					delete answersSwaggerImport.customDTOToClassTemplate;
				}
				resolve({
					swaggerImport: answersSwaggerImport,
				});
			});
		});
	});
}

function writeDirectory(answers) {
	var _path = path.join(answers.path);
	var _pathData = path.join(_path, '/rest');
	utils.writeDir(_path);
	utils.writeDir(_pathData);
	log('Wrote directroy "' + _path + '"');
	log('Wrore directroy "' + _pathData + '"');
	return Boolean(utils.existDir(_path) && utils.existDir(_pathData)) ? _path : undefined;
}

function getConfigFromResult(result) {
	var config = {};
	if (result instanceof Array) {
		utils.for(result, function (value) {
			config = jQueryExtend(true, config, value);
		});
	} else if (typeof result === 'object') {
		config = result;
	}
	return config;
}

function getCleanConfigString(_path, config) {
	config.restPath = '/rest';
	if (typeof config.swaggerImport === 'object') {
		config.swaggerImport.dest = config.restPath;
	}
	config.dirName = '<noQuote>__dirname</noQuote>';
	if (config.funcPath) {
		config.funcPath = '<noQuote>path.join(__dirname, \'' + config.funcPath + '\')</noQuote>';
	}
	if (config.restPath) {
		config.restPath = '<noQuote>path.join(__dirname, \'' + config.restPath + '\')</noQuote>';
	}
	if (config.swaggerImport && config.swaggerImport.responseFuncPath) {
		config.swaggerImport.responseFuncPath = '<noQuote>path.join(__dirname, \'' +
			config.swaggerImport.responseFuncPath + '\')</noQuote>';
	}
	if (config.swaggerImport && config.swaggerImport.dest) {
		config.swaggerImport.dest = '<noQuote>path.join(__dirname, \'' +
			config.swaggerImport.dest + '\')</noQuote>';
	}
	return JSON.stringify(config, null, 4)
		.replace(/"<noQuote>/g, '')
		.replace(/<\/noQuote>"/g, '')
		.replace(/"/g, '\'')
		.replace(/ {4}/g, '\t')
	;
}

function logStart() {
	console.log('');
	console.log(' |                                    |');
	console.log(' |        node-mock-server init       |');
	console.log(' |                                    |');
	console.log('');
}

function logEnd(_path, result) {
	log('Wrote file "' + _path + '/index.js"');
	console.log('');
	if (result.swaggerImport) {
		console.log('Run `node ' + _path + ' swagger-import` for importing schemas!');
	}
	console.log('Run `node ' + _path + '` for starting the server!');
}

function writeGitIgnore(_path) {
	var fileData = '';
	var gitIgnorePath = '.gitignore';
	if (utils.existFile(gitIgnorePath)) {
		fileData = utils.readFile(gitIgnorePath);
	}
	utils.writeFile(gitIgnorePath, fileData + '\n' + _path + '/rest/*/*/*/mock/response.txt');
	log('.gitignore was updated');
}

function initCli() {
	logStart();
	askForPath().then(function (answers) {
		var _path = writeDirectory(answers);
		if (!_path) {
			return;
		}

		writeGitIgnore(_path);

		askForDefaultConfig()
			.then(function () {
				pSeries([
					askForNaming,
					askForHeaders,
					askForSSL,
					askForUrlSettings,
					askForFuncPath,
					askForSwaggerImport,
				]).then(result => {
					var config = getConfigFromResult(result);
					var fileData = [
						'',
						'var mockServer = require(\'node-mock-server\');',
						'var path = require(\'path\');',
						'',
						'mockServer(' + getCleanConfigString(_path, config) + ');',
						'',
					].join('\n');
					utils.writeFile(_path + '/index.js', fileData);
					logEnd(_path, config);
				});
			})
			.catch(function () {
				var fileData = [
					'',
					'var mockServer = require(\'node-mock-server\');',
					'var path = require(\'path\');',
					'',
					'mockServer(' + getCleanConfigString(_path, defaultOptions) + ');',
					'',
				].join('\n');
				utils.writeFile(_path + '/index.js', fileData);
				logEnd(_path, {});
			})
		;
	});
}

module.exports = initCli;
