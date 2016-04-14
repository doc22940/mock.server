
'use strict';

var extend = require('util')._extend,
	validatorLog = require('./ValidatorLog'),
	Utils = require('./Utils');

/**
 *
 * @class ValidatorDataSchema
 * @namespace ValidatorDataSchema
 * @param {object} options
 * @constructor
 *
 * Swagger importer
 */
function ValidatorDataSchema(options) {
	this.init(options);
}

ValidatorDataSchema.prototype = extend(ValidatorDataSchema.prototype, Utils.prototype);
ValidatorDataSchema.prototype = extend(ValidatorDataSchema.prototype, {

	constructor : ValidatorDataSchema,

	_defaults: {
		schema: undefined,
		data: undefined
	},

	/**
	 *
	 * @method init
	 * called by constructor
	 * @param {object} options
	 * @public
	 */
	init: function (options) {

		options = extend(this._defaults, options || {});

		this._options = options;
		this._isValid = true;
		this._schema = this._options.schema;
		this._data = this._options.data;
		this._path = this._options.path;
		this._expected = this._options.expected;

		if (!this._schema || typeof this._schema !== 'object') {
			this._isValid = false;
			validatorLog.error('<code>options.schema</code> can\'t be empty!');
		}

		if (!this._data || typeof this._data !== 'object') {
			this._isValid = false;
			validatorLog.error('<code>options.data</code> can\'t be empty!');
		}

		this._dataMap = this._mapData(this._data);
		this._schemaMap = this._mapSchema(this._schema);

		this._invalidCounter = 0;
		this._validateAll();

		var _validation = {};

		_validation.validation = {};
		_validation.validation[this._expected] = {};
		_validation.validation[this._expected].counter = this._invalidCounter;

		this.setMethodStore(this._path, _validation);

		if (this._invalidCounter > 0) {
			validatorLog.error('Mock data in file <code>' + options.filePathData + '</code> are invalid! ' +
				'<span class="label label-danger">' + this._invalidCounter + '</span> invalid values found.');

			return false;
		}

		validatorLog.success('Mock data in file <code>' + options.filePathData + '</code> are valid!');
		return true;
	},

	/**
	 * @method _validateAll
	 * @returns {void}
	 * @private
	 */
	_validateAll: function () {
		this.for(this._dataMap, function (item) {
			if (!this._validate(item)) {
				this._invalidCounter += 1;
			}
		}.bind(this));
	},

	/**
	 * @method _validate
	 * @param {object} item
	 * @returns {boolean} isValid
	 * @private
	 */
	_validate: function (item) {

		var pathStr = item.path.join('.'),
			schema = this._schemaMap[pathStr];

		if (!schema) {
			validatorLog.error('No schema definition for: <code>' +  pathStr + '</code> found, please check you schema and/or mock file!');
			return false;
		}

		if (schema !== item.type) {
			validatorLog.error('invalid type for: <code>' + pathStr + '</code> ' +
				'with value <code>' + item.value + '</code> found! ' +
				'Value needs to by type of <code>' + schema + '</code>.'
			);
			return false;
		}

		return true;
	},

	/**
	 * @method _mapSchema
	 * @param {object|Array} schema
	 * @returns {object}
	 * @private
	 */
	_mapSchema: function (schema) {

		var out = [],
			outObj = {};

		if (schema instanceof Array) {
			if (schema.length > 0) {
				this._mapSchemaArray({
					data: schema[0],
					path: [],
					out: out
				});
			}
		} else if (typeof schema === 'object') {
			this._mapSchemaObject({
				data: schema,
				path: [],
				out: out
			});
		}

		this.for(out, function (item) {
			if (item.type !== undefined) {
				outObj[item.path.join('.')] = this._mapType(item.type);
			}
		}.bind(this));

		console.log(out);

		return outObj;
	},

	/**
	 * @method _mapSchemaArray
	 * @param {object} opt
	 * @param {Array} opt.path
	 * @param {object} opt.data
	 * @param {Array} opt.out
	 * @returns {void}
	 * @private
	 */
	_mapSchemaArray: function (opt) {

		opt.out.push({
			path: opt.path.slice(),
			type: 'array'
		});

		var path = opt.path.slice();
		path.push('[]');

		this.forIn(opt.data, function (key, value) {

			var newPath = path.slice();

			if (value instanceof Array) {
				if (value.length > 0) {
					newPath.push(key);

					this._mapSchemaArray({
						data: value[0],
						path: newPath,
						out: opt.out
					});
				}
				return;
			}

			if (typeof value === 'object') {

				newPath.push(key);

				this._mapSchemaObject({
					data: value,
					path: newPath,
					out: opt.out
				});
				return;
			}

			newPath.push(key);
			opt.out.push({
				path: newPath,
				type: this._mapType(value.type)
			});

		}.bind(this));

	},

	/**
	 * @method _mapSchemaObject
	 * @param {object} opt
	 * @param {Array} opt.path
	 * @param {object} opt.data
	 * @param {Array} opt.out
	 * @returns {void}
	 * @private
	 */
	_mapSchemaObject: function (opt) {

		opt.out.push({
			path: opt.path.slice(),
			type: 'object'
		});

		this.forIn(opt.data, function (key, value) {
			var newPath = opt.path.slice();

			newPath.push(key);

			if (value instanceof Array) {
				if (value.length > 0) {
					this._mapSchemaArray({
						data: value[0],
						path: newPath,
						out: opt.out
					});
				}
				return;
			}

			if (typeof value === 'object') {
				this._mapSchemaObject({
					data: value,
					path: newPath,
					out: opt.out
				});
				return;
			}

			opt.out.push({
				path: newPath,
				type: this._mapType(value)
			});

			return true;
		}.bind(this));
	},

	/**
	 * @method _mapData
	 * @param {object} data
	 * @returns {Array}
	 * @private
	 */
	_mapData: function (data) {

		var out = [];

		if (data instanceof Array) {
			this._mapDataArray({
				data: data,
				path: [],
				out: out
			});
		} else if (typeof data === 'object') {
			this._mapDataObject({
				data: data,
				path: [],
				out: out
			});
		}

		return out;
	},

	/**
	 * @method _mapDataObject
	 * @param {object} opt
	 * @param {Array} opt.path
	 * @param {object} opt.data
	 * @param {Array} opt.out
	 * @returns {void}
	 * @private
	 */
	_mapDataObject: function (opt) {
		this.forIn(opt.data, function (key, value) {
			var newPath = opt.path.slice(),
				type = this._getType(value),
				isObject = (type === 'object'),
				isArray = (type === 'array');

			newPath.push(key);

			if (isObject || isArray) {
				opt.out.push({
					path: newPath,
					type: type
				});
			} else {
				opt.out.push({
					path: newPath,
					type: type,
					value: value
				});
			}

			if (isObject) {
				this._mapDataObject({
					data: value,
					path: newPath,
					out: opt.out
				});
				return true;
			}

			if (isArray) {
				this._mapDataArray({
					data: value,
					path: newPath,
					out: opt.out
				});
				return true;
			}

			return true;
		}.bind(this));
	},

	/**
	 * @method _mapDataArray
	 * @param {object} opt
	 * @param {Array} opt.path
	 * @param {object} opt.data
	 * @param {Array} opt.out
	 * @returns {void}
	 * @private
	 */
	_mapDataArray: function (opt) {

		var path = opt.path.slice();
		path.push('[]');

		this.for(opt.data, function (value) {

			var newPath = path.slice(),
				type = this._getType(value);

			if (type === 'object') {
				this._mapDataObject({
					data: value,
					path: newPath,
					out: opt.out
				});
				return true;
			}

			if (type === 'array') {
				this._mapDataArray({
					data: value,
					path: newPath,
					out: opt.out
				});
				return true;
			}
		}.bind(this));

	},

	/**
	 * @method _getType
	 * @param {*} value
	 * @returns {string} type
	 * @private
	 */
	_getType: function (value) {

		if (value instanceof Array) {
			return 'array';
		}

		return (typeof value).toLowerCase();
	},

	/**
	 * @method _mapType
	 * @param {string} type
	 * @returns {string} type
	 * @private
	 */
	_mapType: function (type) {

		switch (type) {
			case 'integer': return 'number';
			case 'float': return 'number';
			case 'bigdezimal': return 'number';
			default: return type;
		}

	}

});

module.exports = ValidatorDataSchema;