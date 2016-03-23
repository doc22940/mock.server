
'use strict';

var Utils = require('../lib/Utils'),
	util = require('util'),
	extend = util._extend,
	ejs = require('ejs'),
	AppControllerSingleton = require('./AppController'),
	appController = AppControllerSingleton.getInstance(),
	findFolder = require('../lib/findFolder'),
	getPreferences = require('../lib/getPreferences'),
	getResponseData = require('../lib/getResponseData'),
	getFunc = require('../lib/getFunc');

/**
 *
 * @class MockController
 * @constructor
 *
 */
function MockController() {
	this.init();
}

MockController.prototype = extend(MockController.prototype, Utils.prototype);
MockController.prototype = extend(MockController.prototype, {

	constructor : MockController,

	/**
	 *
	 * @method init
	 * called by constructor
	 * @public
	 */
	init: function () {

		this.options = appController.options;

		appController.app.all('/*', this._handleMockRequest.bind(this));
	},

	/**
	 * @method _handleMockRequest
	 * @param {object} req
	 * @param {object} res
	 * @private
	 */
	_handleMockRequest: function (req, res) {

		var path = req.originalUrl.replace(this.options.urlPath, this.options.restPath),
			method = req.method,
			dir = findFolder(path, this.options) + '/' + method + '/',
			expectedResponse = 'success',
			expectedResponseFilePath = dir + 'mock/response.txt',
			preferences = getPreferences(this.options),
			timeout = 0,
			responseFilePath;

		if (path.search('favicon.ico') >= 0) {
			res.end();
			return true;
		}

		if (preferences && preferences.responseDelay) {
			timeout = parseInt(preferences.responseDelay);
		}

		expectedResponse = this.readFile(expectedResponseFilePath);

		if (req.query && typeof req.query._expected === 'string') {
			expectedResponse = req.query._expected;
		}

		if (req.headers && typeof req.headers._expected === 'string') {
			expectedResponse = req.headers._expected;
		}

		responseFilePath = dir + 'mock/' + expectedResponse + '.json';

		res.setHeader('Content-Type', this.options.contentType);
		res.setHeader('Access-Control-Expose-Headers', this.options.accessControlExposeHeaders);
		res.setHeader('Access-Control-Allow-Origin', this.options.accessControlAllowOrigin);
		res.setHeader('Access-Control-Allow-Methods', this.options.accessControlAllowMethods);
		res.setHeader('Access-Control-Allow-Headers', this.options.accessControlAllowHeaders);

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
				res.send(this.readFile(responseFilePath));
			} else if (method === 'HEAD') {
				res.setHeader('X-Total-Count', Math.floor(Math.random() * 100));
				res.end();
			} else {

				try {
					var responseFile = this.readFile(responseFilePath),
						responseData = getResponseData(req, method),
						outStr;

					try {
						responseData = extend(responseData, getFunc(this.options.funcPath));
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
		}.bind(this), timeout);
	}

});

module.exports = MockController;