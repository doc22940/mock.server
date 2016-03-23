
'use strict';

var Utils = require('../lib/Utils'),
	util = require('util'),
	extend = util._extend,
	AppControllerSingleton = require('./AppController'),
	appController = AppControllerSingleton.getInstance(),
	GetResponse = require('../lib/GetResponse');

/**
 *
 * @class PreferencesController
 * @constructor
 *
 */
function PreferencesController() {
	this.init();
}

PreferencesController.prototype = extend(PreferencesController.prototype, Utils.prototype);
PreferencesController.prototype = extend(PreferencesController.prototype, {

	constructor : PreferencesController,

	/**
	 *
	 * @method init
	 * called by constructor
	 * @public
	 */
	init: function () {

		this.options = appController.options;
		this.preferencesFile = this.options.restPath + '/preferences.json';

		appController.app.post('/service/preferences', this._serviceWritePreferences.bind(this));
	},

	/**
	 * @method _serviceWritePreferences
	 * @param {object} req
	 * @param {object} res
	 * @private
	 */
	_serviceWritePreferences: function (req, res) {

		var data = this.getPreferences(this.options);

		data[req.body.key] = req.body.value;

		this.writeFile(this.preferencesFile, JSON.stringify(data));

		res.end();
	}

});

module.exports = PreferencesController;