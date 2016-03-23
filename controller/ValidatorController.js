
'use strict';

var Utils = require('../lib/Utils'),
	util = require('util'),
	extend = util._extend,
	AppControllerSingleton = require('./AppController'),
	appController = AppControllerSingleton.getInstance(),
	ValidatorResponse = require('../lib/ValidatorResponse'),
	ValidatorResponses = require('../lib/ValidatorResponses'),
	validatorLog = require('../lib/ValidatorLog');

/**
 *
 * @class ValidatorController
 * @constructor
 *
 */
function ValidatorController() {
	this.init();
}

ValidatorController.prototype = extend(ValidatorController.prototype, Utils.prototype);
ValidatorController.prototype = extend(ValidatorController.prototype, {

	constructor : ValidatorController,

	/**
	 *
	 * @method init
	 * called by constructor
	 * @public
	 */
	init: function () {

		this.options = appController.options;

		appController.app.get('/service/validation/response', this._serviceRunValidatorForResponse.bind(this));
		appController.app.get('/service/validation/responses', this._serviceRunValidatorForResponses.bind(this));
	},

	/**
	 * @method _serviceRunValidatorForResponse
	 * @param {object} req
	 * @param {object} res
	 * @private
	 */
	_serviceRunValidatorForResponse: function (req, res) {

		validatorLog.clear();

		new ValidatorResponse({
			path: req.query.path,
			method: req.query.method,
			expected: req.query.expected
		}, this.options);

		res.send(validatorLog.get());
		res.end();
	},

	/**
	 * @method _serviceRunValidatorForResponses
	 * @param {object} req
	 * @param {object} res
	 * @private
	 */
	_serviceRunValidatorForResponses: function (req, res) {

		validatorLog.clear();

		new ValidatorResponses({
			restPath: this.options.restPath
		}, this.options);

		res.send(validatorLog.get());
		res.end();
	}

});

module.exports = ValidatorController;