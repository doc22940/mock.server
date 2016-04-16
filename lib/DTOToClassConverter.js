
'use strict';

var fs = require('fs'),
	extend = require('util')._extend,
	Utils = require('./Utils');

/**
 *
 * @class AppController
 * @param {string} name
 * @param {object} dtoJson
 * @param {object} options
 * @constructor
 *
 * DTO to Class converter
 */
function DTOToClassConverter(name, dtoJson, options) {
	this.init(name, dtoJson, options);
}

DTOToClassConverter.prototype = extend(DTOToClassConverter.prototype, Utils.prototype);
DTOToClassConverter.prototype = extend(DTOToClassConverter.prototype, {

	constructor : DTOToClassConverter,

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
	 * @param {string|undefined} options.jsVersion
	 * @public
	 */
	init: function (name, dtoJson, options) {

		options = extend(this._defaults, options || {});

		this._name = name;
		this._options = options;
		this._json = dtoJson;
		this._methods = [];
		this._classStr = '';
		this._getterStr = '';
		this._setterStr = '';
		this._validStr = '';

		this._readTplFiles();
		this._getNode(this._json, []);

		this._classStr = this._replace(this._classStr, {
			className: this._name,
			methods: this._getMethodsStr()
		});
	},

	/**
	 * @method get
	 * @returns {string}
	 * @public
	 */
	get: function () {
		return this._classStr;
	},

	/**
	 * @method _getNode
	 * @param {object} data
	 * @param {Array} path
	 * @returns {boolean}
	 * @private
	 */
	_getNode: function (data, path) {

		if (typeof data !== 'object') {
			return false;
		}

		this.forIn(data, function (key, value) {

			if (value instanceof Array) {
				this._writeMethods(key, 'Array', path);
				return;
			}

			if (typeof value === 'object') {
				this._getNode(value, this._getPath(path, key));
				return;
			}

			if (typeof value === 'string') {
				if (value.search(/^\$ref-/) >= 0) {
					this._getRef(key, path);
					return;
				}

				this._writeMethods(key, value, path);
			}

		}.bind(this));

	},

	/**
	 * @method _getPath
	 * @param {string} path
	 * @param {string} key
	 * @returns {Array}
	 * @private
	 */
	_getPath: function (path, key) {
		var pathNew = path.slice();
		pathNew.push(key);
		return pathNew;
	},

	/**
	 * @method _getRef
	 * @param {string} name
	 * @param {Array} path
	 * @private
	 */
	_getRef: function (name, path) {
		if (this._options.isGetter) {
			this._methods.push(this._getMethodGetter(name, 'Object|Array', path));
		}
		if (this._options.isSetter) {
			this._methods.push(this._getMethodSetter(name, 'Object|Array', path));
		}
	},

	/**
	 * @method _getMethodsStr
	 * @returns {string}
	 * @private
	 */
	_getMethodsStr: function () {
		if (this._options.jsVersion === 'es5') {
			return this._methods.join(',\n\n');
		}
		return this._methods.join('\n\n');
	},

	/**
	 * @method _writeMethods
	 * @param {string} name
	 * @param {string} type
	 * @param {Array} path
	 * @private
	 */
	_writeMethods: function (name, type, path) {
		type = this._getType(type);
		if (this._options.isGetter) {
			this._methods.push(this._getMethodGetter(name, type, path));
		}
		if (this._options.isSetter) {
			this._methods.push(this._getMethodSetter(name, type, path));
		}
		if (this._options.isValidator) {
			this._methods.push(this._getMethodValid(name, type, path));
		}
	},

	/**
	 * @method _getType
	 * @param {string} type
	 * @returns {string}
	 * @private
	 */
	_getType: function (type) {

		type = type.toLowerCase();

		switch (type) {
			case 'integer': type = 'number'; break;
			case 'float': type = 'number'; break;
			case 'double': type = 'number'; break;
		}

		return this.capitalize(type);
	},

	/**
	 * @method _getMethodPath
	 * @param {Array} path
	 * @param {string} name
	 * @returns {string}
	 * @private
	 */
	_getMethodPath: function (path, name) {
		if (path.length < 1) {
			return name;
		}
		return path.join('.') + '.' + name;
	},

	/**
	 * @method _getMethodName
	 * @param {Array} path
	 * @param {string} name
	 * @returns {string}
	 * @private
	 */
	_getMethodName: function (path, name) {
		var outArr = [];
		if (path.length < 1) {
			return this.capitalize(name);
		}

		this.for(path, function (value) {
			outArr.push(this.capitalize(value));
		}.bind(this));

		return outArr.join('') + this.capitalize(name);
	},

	/**
	 * @method _getMethodGetter
	 * @param {string} name
	 * @param {string} type
	 * @param {Array} path
	 * @returns {string}
	 * @private
	 */
	_getMethodGetter: function (name, type, path) {
		return this._replace(this._getterStr, {
			name: this._getMethodName(path, name),
			returnType: type,
			path: this._getMethodPath(path, name)
		});
	},

	/**
	 * @method _getMethodSetter
	 * @param {string} name
	 * @param {string} type
	 * @param {Array} path
	 * @returns {string}
	 * @private
	 */
	_getMethodSetter: function (name, type, path) {
		return this._replace(this._setterStr, {
			name: this._getMethodName(path, name),
			valueType: type,
			path: this._getMethodPath(path, name)
		});
	},

	/**
	 * @method _getMethodValid
	 * @param {string} name
	 * @param {string} type
	 * @param {Array} path
	 * @returns {string}
	 * @private
	 */
	_getMethodValid: function (name, type, path) {
		return this._replace(this._validStr, {
			name: this._getMethodName(path, name),
			type: type,
			path: this._getMethodPath(path, name)
		});
	},

	/**
	 * @method _readTplFiles
	 * @returns {void}
	 * @private
	 */
	_readTplFiles: function () {
		this._classStr = this.readFile(__dirname + '/../src/templates/dto_' + this._options.jsVersion + '_class.tpl');
		this._getterStr = this.readFile(__dirname + '/../src/templates/dto_' + this._options.jsVersion + '_getter.tpl');
		this._setterStr = this.readFile(__dirname + '/../src/templates/dto_' + this._options.jsVersion + '_setter.tpl');
		this._validStr = this.readFile(__dirname + '/../src/templates/dto_' + this._options.jsVersion + '_valid.tpl');
	},

	/**
	 * @method _replace
	 * @param {string} input
	 * @param {object} obj
	 * @returns {string}
	 * @private
	 */
	_replace: function (input, obj) {
		var out = input;

		this.forIn(obj, function (key, value) {
			out = this._replaceItem(out, key, value);
		}.bind(this));

		return out;
	},

	/**
	 * @method _replaceItem
	 * @param {string} input
	 * @param {string} replaceStr
	 * @param {string} replaceWith
	 * @returns {string}
	 * @private
	 */
	_replaceItem: function (input, replaceStr, replaceWith) {
		var regExp = new RegExp('<%=' + replaceStr + '%>', 'g');

		return input.replace(regExp, replaceWith);
	}

});

module.exports = DTOToClassConverter;