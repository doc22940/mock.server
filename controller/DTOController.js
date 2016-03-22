
'use strict';

var Utils = require('../lib/Utils'),
	util = require('util'),
	extend = util._extend,
	AppControllerSingleton = require('./AppController'),
	appController = AppControllerSingleton.getInstance(),
	DTOToClassConverter = require('../lib/DTOToClassConverter');

/**
 *
 * @class DTOController
 * @constructor
 *
 */
function DTOController() {
	this.init();
}

DTOController.prototype = extend(DTOController.prototype, Utils.prototype);
DTOController.prototype = extend(DTOController.prototype, {

	constructor : DTOController,

	/**
	 *
	 * @method init
	 * called by constructor
	 * @public
	 */
	init: function () {

		this.options = appController.options;

		appController.app.get('/service/class-dto', this._serviceDTOToClassConverter.bind(this));
	},

	/**
	 * @method _serviceDTOToClassConverter
	 * @param {object} req
	 * @param {object} res
	 * @private
	 */
	_serviceDTOToClassConverter: function (req, res) {
		var json = JSON.parse(this.readFile(req.query.path)),
			dtoToClassConverter = new DTOToClassConverter(req.query.name, json, {
				jsVersion: req.query.es,
				isSetter: (req.query.setter === 'true'),
				isGetter: (req.query.getter === 'true'),
				isValidator: (req.query.validator === 'true')
			});
		res.send(dtoToClassConverter.get());
	}

});

module.exports = DTOController;