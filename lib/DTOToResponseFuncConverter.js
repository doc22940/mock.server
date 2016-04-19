
'use strict';

var fs = require('fs'),
	extend = require('util')._extend,
	Utils = require('./Utils');

/**
 *
 * @class DTOToResponseFuncConverter
 * @param {string} name
 * @param {object} dtoJson
 * @param {object} options
 * @constructor
 *
 * DTO to Class converter
 */
function DTOToResponseFuncConverter(name, dtoJson, options) {
	this.init(name, dtoJson, options);
}

DTOToResponseFuncConverter.prototype = extend(DTOToResponseFuncConverter.prototype, Utils.prototype);
DTOToResponseFuncConverter.prototype = extend(DTOToResponseFuncConverter.prototype, {

	constructor : DTOToResponseFuncConverter,

	_defaults: {
		jsVersion: 'es5',
		isSetter: true,
		isGetter: true,
		isValidator: true
	},

	/**
	 *
	 * @method init
	 * called by constructor
	 * @param {string} name
	 * @param {object} dtoJson
	 * @param {object} options
	 * @param {string|undefined} options.responseFuncPath
	 * @public
	 */
	init: function (name, dtoJson, options) {

		//options = extend(this._defaults, options || {});

		this._path = this._options.responseFuncPath;
		this._name = name;
		this._options = options;
		this._json = dtoJson;

	},

	create: function () {


		return true;
	},

	write: function () {

	}

});

module.exports = DTOToResponseFuncConverter;