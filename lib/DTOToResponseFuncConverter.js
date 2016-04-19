
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

		this._options = options;
		this._path = this._options.responseFuncPath;
		this._name = name;
		this._json = undefined;

		try {
			this._json = JSON.parse(JSON.stringify(dtoJson));
		} catch (err) {}

	},

	/**
	 * @method _isValid
	 * @returns {boolean}
	 * @private
	 */
	_isValid: function () {
		return (
			this.isFilledString(this._path) &&
			this.isFilledString(this._name) &&
			typeof this._options === 'object' &&
			typeof this._json === 'object'
		);
	},

	/**
	 * @method create
	 * @returns {boolean} isValid
	 * @public
	 */
	create: function () {

		if (!this._isValid()) {
			return false;
		}

		this._mapUnknown(this._json);

		console.dir(this._json);
		return true;
	},

	/**
	 * @method _mapUnknown
	 * @param data
	 * @private
	 */
	_mapUnknown: function (data) {

		if (data instanceof Array) {

			return;
		}

		if (typeof data === 'object') {
			this._mapObject(data);
			return;
		}

	},

	/**
	 * @method _mapObject
	 * @param {Object} obj
	 * @private
	 */
	_mapObject: function (obj) {

		this.forIn(obj, function (key, value) {
			obj[key] = this._mapUnknown(value);
		});

	},

	write: function () {

	}

});

module.exports = DTOToResponseFuncConverter;