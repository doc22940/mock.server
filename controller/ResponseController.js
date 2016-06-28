
'use strict';

var Utils = require('../lib/Utils'),
	util = require('util'),
	extend = util._extend,
	log = require('chip')(),
	AppControllerSingleton = require('./AppController'),
	appController = AppControllerSingleton.getInstance(),
	GetResponse = require('../lib/GetResponse');

/**
 *
 * @class ResponseController
 * @constructor
 *
 */
function ResponseController() {
	this.init();
}

ResponseController.prototype = extend(ResponseController.prototype, Utils.prototype);
ResponseController.prototype = extend(ResponseController.prototype, {

	constructor : ResponseController,

	/**
	 *
	 * @method init
	 * called by constructor
	 * @public
	 */
	init: function () {

		this.options = appController.options;

		appController.app.post('/service/expected-response', this._serviceWriteExpectedResponse.bind(this));
		// add get also to make it linkable
		appController.app.get('/service/expected-response', this._serviceWriteExpectedResponseLinkable.bind(this));
		appController.app.get('/view/response', this._viewResponse.bind(this));
	},

	/**
	 * @method _viewResponse
	 * @param {object} req
	 * @param {object} res
	 * @private
	 */
	_viewResponse: function (req, res) {
		var data,
			response = new GetResponse({
				path: req.query.path,
				method: req.query.method,
				expected: req.query.expected
			}, this.options);

		data = response.get();

		if (typeof data === 'object') {
			res.send(JSON.stringify(data, null, 2));
			res.end();
			return;
		}

		try {
			res.send(JSON.stringify(JSON.parse(data), null, 2));
			res.end();
			return;
		} catch (err) {}

		res.send(data);
		res.end();
	},

	/**
	 * @method _serviceWriteExpectedResponse
	 * @param {object} req
	 * @param {object} res
	 * @private
	 */
	_serviceWriteExpectedResponse: function (req, res) {

		var path = req.body.path,
			value = req.body.value,
			linkableUrl = this.options.urlBase + '/service/expected-response?path=' +
			encodeURIComponent(path) +
			'&value=' + value;

		this.writeFile(path + 'response.txt', value);

		res.send({
			path: path,
			value: value,
			linkableUrl: linkableUrl
		});

		if (process.env.NODE_ENV !== 'test') {
			log.info('Expected response set. Linkable Url: ' + linkableUrl);
		}

		res.end();
	},

	/**
	 * @method _serviceWriteExpectedResponseLinkable
	 * @param {object} req
	 * @param {object} res
	 * @private
	 */
	_serviceWriteExpectedResponseLinkable: function (req, res) {
		this.writeFile(req.query.path + 'response.txt', req.query.value);
		res.send('Expected response set.<br/>value: ' + req.query.value + '<br/>path: ' + req.query.path);
		res.end();
	}

});

module.exports = ResponseController;