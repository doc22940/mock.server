
'use strict';

var express = require('express'),
	app = express(),
	fs = require('fs'),
	bodyParser = require('body-parser'),
	Utils = require('./lib/Utils'),
	_utils = new Utils(),
	util = require('util'),
	extend = util._extend,
	ejs = require('ejs'),
	Ui = require('./lib/ui'),
	getResponseData = require('./lib/getResponseData'),
	getFunc = require('./lib/getFunc'),
	getPreferences = require('./lib/getPreferences'),
	SwaggerImport = require('./lib/SwaggerImport'),
	swaggerLog = require('./lib/SwaggerLog'),
	GetResponse = require('./lib/GetResponse'),
	ValidatorResponse = require('./lib/ValidatorResponse'),
	ValidatorResponses = require('./lib/ValidatorResponses'),
	validatorLog = require('./lib/ValidatorLog'),
	findFolder = require('./lib/findFolder');

module.exports = function (options) {

	var defaults = {
			restPath: './rest',
			title: 'Api mock server',
			version: 1,
			urlBase: 'http://localhost:3001',
			urlPath: '/rest/v1',
			port: 3001,
			contentType: 'application/json',
			accessControlExposeHeaders: 'X-Total-Count',
			accessControlAllowOrigin: '*',
			accessControlAllowMethods: 'GET, POST, PUT, OPTIONS, DELETE, PATCH, HEAD',
			accessControlAllowHeaders: 'origin, x-requested-with, content-type'
	}, obj;

	obj = extend(defaults, options);

	app.listen(obj.port, function () {
		if (process.env.NODE_ENV !== 'test') {
			console.log('server started at port ' + obj.port);
		}
	});

	app.use('/src', express.static(__dirname + '/src'));
	app.use('/node_modules', express.static(__dirname + '/node_modules'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.set('view engine', 'ejs');
	app.set('views', __dirname + '/views');

	// RENDER UI
	app.get('/', function (req, res) {

		var ui = new Ui(obj),
			data = ui.get('data');

		res.render('default.ejs', {
			apiData: data,
			title: obj.title,
			swaggerImport: ui.get('swaggerImport'),
			isSwaggerImportAvailable: ui.get('isSwaggerImportAvailable'),
			version: obj.version,
			urlBase: obj.urlBase,
			urlPath: obj.urlPath
		});
	});

	// SERVICES
	app.get('/service/mock-preview', function (req, res) {
		res.send(_utils.readFile(req.query.path));
	});

	app.get('/service/schema', function (req, res) {
		if (req.query && req.query.url) {

			try {
				var method = req.query.method || 'GET',
					title = (req.query.type || '') + ' Schema',
					path = (req.query.path || '');
				res.render('service-schema.ejs', {
					pageTitle: title,
					title: title + ' | ' + method + ' | ' + path,
					subTitle: path,
					method: method,
					methodLower: method.toLowerCase(),
					schemaJSON: fs.readFileSync(req.query.url, 'utf8')
				});
			} catch (err) {
				res.send('Not Found');
			}

		} else {
			res.send('Not Found');
		}
	});

	app.get('/service/schema-file', function (req, res) {
		if (req.query && req.query.url) {
			try {
				res.send(fs.readFileSync(req.query.url, 'utf8'));
			} catch (err) {
				res.send('Not Found');
			}

		} else {
			res.send('Not Found');
		}
	});

	app.get('/service/swagger-import', function (req, res) {
		var swaggerImporter = new SwaggerImport(options.swaggerImport);
		swaggerImporter.doImport(function () {
			res.send(swaggerLog.get());
			res.end();
		});
	});

	app.post('/service/expected-response', function (req, res) {
		fs.writeFileSync(req.body.path + 'response.txt', req.body.value);
		res.end();
	});

	app.post('/service/preferences', function (req, res) {

		var data = getPreferences(obj);

		data[req.body.key] = req.body.value;

		fs.writeFileSync(obj.restPath + '/preferences.json', JSON.stringify(data));

		res.end();
	});

	app.get('/service/response', function (req, res) {

		var response = new GetResponse({
			path: req.query.path,
			method: req.query.method,
			expected: req.query.expected
		}, obj);

		res.send(response.get());
		res.end();
	});

	app.get('/service/validation/response', function (req, res) {

		validatorLog.clear();

		new ValidatorResponse({
			path: req.query.path,
			method: req.query.method,
			expected: req.query.expected
		}, obj);

		res.send(validatorLog.get());
		res.end();
	});

	app.get('/service/validation/responses', function (req, res) {

		validatorLog.clear();

		new ValidatorResponses({
			restPath: obj.restPath
		}, obj);

		res.send(validatorLog.get());
		res.end();
	});

	// MOCK SERVER
	app.all('/*', function (req, res) {
		var path = req.originalUrl.replace(obj.urlPath, obj.restPath),
			method = req.method,
			dir = findFolder(path, obj) + '/' + method + '/',
			expectedResponse = 'success',
			expectedResponseFilePath = dir + 'mock/response.txt',
			preferences = getPreferences(obj),
			timeout = 0,
			responseFilePath;

		if (path.search('favicon.ico') >= 0) {
			res.end();
			return true;
		}

		if (preferences && preferences.responseDelay) {
			timeout = parseInt(preferences.responseDelay);
		}

		try {
			expectedResponse = fs.readFileSync(expectedResponseFilePath, 'utf8');
		} catch (err) {}

		if (req.query && typeof req.query._expected === 'string') {
			expectedResponse = req.query._expected;
		}

		if (req.headers && typeof req.headers._expected === 'string') {
			expectedResponse = req.headers._expected;
		}

		responseFilePath = dir + 'mock/' + expectedResponse + '.json';

		res.setHeader('Content-Type', obj.contentType);
		res.setHeader('Access-Control-Expose-Headers', obj.accessControlExposeHeaders);
		res.setHeader('Access-Control-Allow-Origin', obj.accessControlAllowOrigin);
		res.setHeader('Access-Control-Allow-Methods', obj.accessControlAllowMethods);
		res.setHeader('Access-Control-Allow-Headers', obj.accessControlAllowHeaders);

		setTimeout(function () {

			if (expectedResponse.search('error') >= 0) {
				var status,
					reg = /(error)(-)([0-9]{3})/.exec(expectedResponse);

				if (reg === null) {
					status = 500;
				} else {
					status = parseInt(reg[3]);
				}

				res.statusCode = status;
				res.send(fs.readFileSync(responseFilePath, 'utf-8'));
			} else if (method === 'HEAD') {
				res.setHeader('X-Total-Count', Math.floor(Math.random() * 100));
				res.end();
			} else {

				try {
					var responseFile = fs.readFileSync(responseFilePath, 'utf-8'),
						responseData = getResponseData(req, method),
						outStr;

					try {
						responseData = extend(responseData, getFunc(obj.funcPath));
						outStr = ejs.render(responseFile, responseData);
					} catch (err) {
						console.log(err);
					}

					if (outStr) {
						res.send(outStr);
					} else {
						res.send(responseFile);
					}
				} catch (err) {
					console.log(err);
					res.end();
				}
			}
		}, timeout);

	});

};

