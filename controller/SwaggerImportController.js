
'use strict';

var Utils = require('../lib/Utils'),
	util = require('util'),
	extend = util._extend,
	AppControllerSingleton = require('./AppController'),
	appController = AppControllerSingleton.getInstance(),
	SwaggerImport = require('../lib/SwaggerImport'),
	swaggerLog = require('../lib/SwaggerLog');

/**
 *
 * @class SwaggerImportController
 * @constructor
 *
 */
function SwaggerImportController() {
	this.init();
}

SwaggerImportController.prototype = extend(SwaggerImportController.prototype, Utils.prototype);
SwaggerImportController.prototype = extend(SwaggerImportController.prototype, {

	constructor : SwaggerImportController,

	/**
	 *
	 * @method init
	 * called by constructor
	 * @public
	 */
	init: function () {

		this.options = appController.options;

		appController.app.get('/service/swagger-import', this._serviceSwaggerImport.bind(this));
	},

	/**
	 * @method _serviceSwaggerImport
	 * @param {object} req
	 * @param {object} res
	 * @private
	 */
	_serviceSwaggerImport: function (req, res) {
		var swaggerImporter = new SwaggerImport(this.options.swaggerImport);
		swaggerImporter.doImport(function () {
			res.send(swaggerLog.get());
			res.end();
		});
	}

});

module.exports = SwaggerImportController;