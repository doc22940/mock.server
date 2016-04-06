
'use strict';

var Utils = require('../lib/Utils'),
	util = require('util'),
	extend = util._extend,
	ejs = require('ejs'),
	faker = require('faker'),
	AppControllerSingleton = require('./AppController'),
	appController = AppControllerSingleton.getInstance();

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
			dir = this._findFolder(path, this.options) + '/' + method + '/',
			expectedResponse = this._getExpectedResponse(req, dir),
			preferences = this.getPreferences(this.options),
			timeout = 0,
			responseFilePath,
			options;

		if (path.search('favicon.ico') >= 0) {
			res.end();
			return true;
		}

		if (preferences && preferences.responseDelay) {
			timeout = parseInt(preferences.responseDelay);
		}

		responseFilePath = dir + 'mock/' + expectedResponse + '.json';

		options = {
			req: req,
			res: res,
			path: path,
			method: method,
			dir: dir,
			expectedResponse: expectedResponse,
			preferences: preferences,
			timeout: timeout,
			responseFilePath: responseFilePath
		};

		this._writeDefaultHeader(res);

		setTimeout(function () {
			if (expectedResponse.search('error') >= 0) {
				this._sendError(options);
			} else if (method === 'HEAD') {
				this._sendHead(options);
			} else {
				this._sendSuccess(options);
			}
		}.bind(this), timeout);
	},

	/**
	 * @method _sendSuccess
	 * @param {object} options
	 * @returns {void}
	 * @private
	 */
	_sendSuccess: function (options) {

		try {
			var responseFile = this.readFile(options.responseFilePath),
				responseData = this._getResponseData(options.req, options.method),
				outStr;

			try {
				responseData = extend(responseData, this._getFunc(this.options.funcPath));
				responseData = extend(responseData, this._getDynamicPathParams(options));
				outStr = ejs.render(responseFile, responseData);
			} catch (err) {
				console.log(err);
			}

			if (outStr) {
				options.res.send(outStr);
			} else {
				options.res.send(responseFile);
			}
		} catch (err) {
			console.log(err);
			options.res.end();
		}

	},

	/**
	 * @method _sendError
	 * @param {object} options
	 * @returns {void}
	 * @private
	 */
	_sendError: function (options) {
		var status,
			reg = /(error)(-)([0-9]{3})/.exec(options.expectedResponse);

		if (reg === null) {
			status = 500;
		} else {
			status = parseInt(reg[3]);
		}

		options.res.statusCode = status;
		options.res.send(this.readFile(options.responseFilePath));
	},

	/**
	 * @method _sendHead
	 * @param {object} options
	 * @returns {void}
	 * @private
	 */
	_sendHead: function (options) {
		options.res.setHeader('X-Total-Count', Math.floor(Math.random() * 100));
		options.res.end();
	},

	/**
	 * @method _getExpectedResponse
	 * @param {object} req
	 * @param {string} dir
	 * @returns {string}
	 * @private
	 */
	_getExpectedResponse: function (req, dir) {

		var expectedResponse = 'success',
			expectedResponseFilePath = dir + 'mock/response.txt';

		try {
			expectedResponse = this.readFile(expectedResponseFilePath);
		} catch (err) {}

		if (req.query && typeof req.query._expected === 'string') {
			expectedResponse = req.query._expected;
		}

		if (req.headers && typeof req.headers._expected === 'string') {
			expectedResponse = req.headers._expected;
		}

		return expectedResponse;
	},

	/**
	 * @method _getFunc
	 * @param {string|Array} path
	 * @returns {object}
	 * @private
	 */
	_getFunc: function (path) {
		var _this = this,
			func = {},
			list = [];

		function addFunc (path) {
			var out = {};

			try {
				out = require(path);
			} catch (err) {}

			func = extend(func, out);
		}

		function addDirectory (path) {
			try {
				list = _this.readDir(path, ['.DS_Store']);
			} catch (err) {
				if (process.env.NODE_ENV !== 'test') {
					console.log('Folder "' + path + '" not found!');
				}
			}

			list.forEach(function (item) {
				addFunc(item.path);
			});
		}

		if (path instanceof Array) {
			path.forEach(function (itemPath) {
				addDirectory(itemPath);
			});
		} else if (typeof(path) === 'string' && path !== '') {
			addDirectory(path);
		}

		func = extend(func, {
			faker: faker
		});

		return func;
	},

	/**
	 * @method _getDynamicPathParams
	 * @param {object} options
	 * @returns {object}
	 * @private
	 */
	_getDynamicPathParams: function (options) {

		var path = options.path.split('?')[0].split('#')[0],
			pathSpl = path.split('/'),
			regDirReplace = new RegExp('\/' + options.method + '\/$'),
			regMatchDyn = /^#{([^}]*)}$/,
			dir = options.dir.replace(regDirReplace, ''),
			dirSpl = dir.split('/'),
			params = {};

		if (dirSpl.length !== pathSpl.length) {
			return {};
		}

		this.for(dirSpl, function (dirItem, i) {

			var exp = regMatchDyn.exec(dirItem);

			if (exp !== null && exp.length > 0) {
				params[exp[1]] = pathSpl[i];
			}
		});

		return {
			params: params
		}
	},

	/**
	 * @method _getResponseData
	 * @param {object} req
	 * @param {string} method
	 * @returns {object}
	 * @private
	 */
	_getResponseData: function (req, method) {
		var responseData = {};

		switch (method) {
			case 'POST':	responseData = req.body; break;
			case 'GET':		responseData = req.query; break;
			case 'PUT':		responseData = req.body; break;
			case 'PATCH':	responseData = req.body; break;
			case 'DELETE':	responseData = req.body; break;
		}

		return responseData;
	},

	/**
	 *
	 * @method _isPathMatch
	 * @param {string} pathPatter
	 * @param {string} path
	 * @returns {boolean} isPathMatch
	 * @private
	 */
	_isPathMatch: function (pathPatter, path) {

		var pathPatterSpl = pathPatter.split('#'),
			pathSpl = path.split('#');

		pathSpl.forEach(function (pathItem, index) {
			var pathPatterItem = pathPatterSpl[index];

			if (/({)(.*)(})/.test(pathPatterItem)) {
				pathSpl[index] = pathPatterItem;
			}
		});

		return pathSpl.join('#') === pathPatter;
	},

	/**
	 * @method _findFolder
	 * @param {string} path
	 * @param {object} options
	 * @returns {object}
	 * @private
	 */
	_findFolder: function (path, options) {

		path = path.split('?')[0];

		var pathArr = path.split('/'),
			restPathLength = options.restPath.split('/').length + 1,
			pathRoot = pathArr.splice(0, restPathLength).join('/'),
			pathFolder = '#' + pathArr.join('#'),
			pathFolderArr,
			dirs, output = '', i;

		if (pathFolder === '#') {
			return pathRoot + '/#';
		}

		dirs = this.readDir(pathRoot, ['.DS_Store']);
		pathFolderArr = pathFolder.split('#');

		for (i = 0; i < dirs.length; i += 1) {
			var item = dirs[i].file,
				itemArr = item.split('#');

			if (item !== 'preferences.json' && itemArr.length === pathFolderArr.length) {

				if (item === pathFolder) {
					output = pathRoot + '/' + item;
					i = dirs.length + 1;
				} else {
					if (this._isPathMatch(item, pathFolder)) {
						output = pathRoot + '/' + item;
						i = dirs.length + 1;
					}
				}
			}
		}

		return output;
	},

	/**
	 * @method _writeDefaultHeader
	 * @param {object} res
	 * @returns {void}
	 * @private
	 */
	_writeDefaultHeader: function (res) {
		res.setHeader('Content-Type', this.options.contentType);
		res.setHeader('Access-Control-Expose-Headers', this.options.accessControlExposeHeaders);
		res.setHeader('Access-Control-Allow-Origin', this.options.accessControlAllowOrigin);
		res.setHeader('Access-Control-Allow-Methods', this.options.accessControlAllowMethods);
		res.setHeader('Access-Control-Allow-Headers', this.options.accessControlAllowHeaders);
	}

});

module.exports = MockController;