
'use strict';

var Utils = require('../lib/Utils'),
	util = require('util'),
	extend = util._extend,
	AppControllerSingleton = require('./AppController'),
	appController = AppControllerSingleton.getInstance(),
	Ui = require('../lib/UserInterface');

/**
 *
 * @class UiController
 * @constructor
 *
 */
function UiController() {
	this.init();
}

UiController.prototype = extend(UiController.prototype, Utils.prototype);
UiController.prototype = extend(UiController.prototype, {

	constructor : UiController,

	/**
	 *
	 * @method init
	 * called by constructor
	 * @public
	 */
	init: function () {

		this.options = appController.options;

		appController.app.get('/', this._renderUi.bind(this));
	},

	/**
	 * @method renderUi
	 * @param {object} req
	 * @param {object} res
	 * @private
	 */
	_renderUi: function (req, res) {
		var options = this.options,
			ui = new Ui(this.options),
			data = ui.get('data');

		res.render('default.ejs', {
			apiData: data,
			dataDto: ui.get('dataDto'),
			title: options.title,
			swaggerImport: ui.get('swaggerImport'),
			isSwaggerImportAvailable: ui.get('isSwaggerImportAvailable'),
			version: options.version,
			urlBase: options.urlBase,
			urlPath: options.urlPath
		});
	}

});

module.exports = UiController;