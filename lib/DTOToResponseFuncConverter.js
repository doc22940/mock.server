
'use strict';

var fs = require('fs'),
	extend = require('util')._extend,
	Utils = require('./Utils'),
	responsePreKey = 'imported';

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
			typeof this._json === 'object' &&
			this._name === 'ComplexDTO'
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

		console.dir(this._mapUnknown(this._json, ''));
		return true;
	},

	/**
	 * @method _mapUnknown
	 * @param {Object} data
	 * @param {String|undefined} key
	 * @private
	 */
	_mapUnknown: function (data, key) {

		if (data instanceof Array) {
			return;
		}

		if (typeof data === 'object') {
			return this._mapObject(data);
		}

		if (typeof data === 'string') {
			return this._mapString(data, key);
		}

		return data;
	},

	/**
	 * @method _mapObject
	 * @param {Object} obj
	 * @private
	 */
	_mapObject: function (obj) {

		var objOut = {};

		this.forIn(obj, function (key, value) {
			objOut[key] = this._mapUnknown(value, key);
		});

		return objOut;
	},

	/**
	 * @method _mapString
	 * @param {String} value
	 * @param {String|undefined} key
	 * @private
	 */
	_mapString: function (value, key) {

		console.log(value);
		console.log(key);

		if (value.search(/^\$ref-/) >= 0) {
			return this._mapReference(value);
		}

	},

	/**
	 * @method _mapReference
	 * @param {String} refString
	 * @returns {String}
	 * @private
	 */
	_mapReference: function (refString) {
		return '<%-'+ responsePreKey + refString.replace('$ref-', '') +'();%>';
	},

	write: function () {

	}

});

module.exports = DTOToResponseFuncConverter;