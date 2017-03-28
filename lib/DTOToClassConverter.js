'use strict';

var ejs = require('ejs'),
	extend = require('util')._extend,
	Utils = require('./Utils'),
	regExpRef = (/^\$ref\-/);

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

	constructor: DTOToClassConverter,

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
		this._normalized = this.normalize(this._json);
		this._methods = [];
		this._constructorArguments = [];
		this._classStr = '';
		this._getterStr = '';
		this._setterStr = '';
		this._validStr = '';
		this._argumentStr = '';

		// EJS
		this._classStr = ejs.render(this.readFile(
			__dirname + '/../src/templates/dto_' + this._options.jsVersion + '.ejs'),
			extend(this._normalized, {
				className: name,
				classNameDecapitalize: this.decapitalize(name),
				options: this._options
			})
		);
	},

	getNormalizedAttribute(name, type, refs) {

		var isRef = Boolean(type.search(regExpRef) >= 0),
			nameCamel = this.toCamel(name.replace(/\./g, '-')),
			ref,
			out = {
				name: name,
				nameCamel: nameCamel,
				nameCapitalize: this.capitalize(nameCamel),
				type: (isRef ? 'ref': type)
			};

		if (isRef) {
			ref = type.replace(regExpRef, '');
			refs[ref] = true;
			out.ref = ref;
		}

		return out;
	},

	normalize(jsonData, parent) {

		var attributes = [],
			refs = {},
			refsArr = [];

		this.forIn(jsonData, function (key, value) {

			var nameArr = [],
				name,
				normalizedAttr,
				childResults,
				subRef;

			if (parent && typeof parent.name === 'string') {
				nameArr.push(parent.name);
			}

			nameArr.push(key);
			name = nameArr.join('.');

			if (typeof value === 'string') {
				attributes.push(this.getNormalizedAttribute(name, value, refs));
				return;
			}

			if (value instanceof Array) {
				normalizedAttr = this.getNormalizedAttribute(name, 'Array');

				if (typeof value[0] === 'object') {
					childResults = this.normalize(value[0]);
					normalizedAttr.attributes = childResults.attributes;
					childResults.refs.forEach(function (ref) {
						refs[ref] = true;
					});
					normalizedAttr.subType = 'Object';
				} else if (value[0].search(regExpRef) >= 0) {
					subRef = value[0].replace(regExpRef, '');
					normalizedAttr.subType = 'ref';
					normalizedAttr.subRef = subRef;
					normalizedAttr.subRefDecapitalize = this.decapitalize(subRef);
					refs = extend(refs, {
						[subRef]: true
					});
				}
				attributes.push(normalizedAttr);
				return;
			}

			if (typeof value === 'object') {
				normalizedAttr = this.getNormalizedAttribute(name, 'Object');
				attributes.push(normalizedAttr);
				childResults = this.normalize(value, normalizedAttr);
				refs = extend(refs, childResults.refs);
				attributes = attributes.concat(childResults.attributes);
			}
		});

		this.forIn(refs, function (key) {
			refsArr.push(key);
		});

		return {
			refs: refsArr,
			attributes: attributes
		};
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
			case 'integer':
				type = 'number';
				break;
			case 'float':
				type = 'number';
				break;
			case 'double':
				type = 'number';
				break;
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
	 * @method _getMethodOptions
	 * @param {string} name
	 * @param {string} type
	 * @param {Array} path
	 * @param {string} typeName
	 * @returns {string}
	 * @private
	 */
	_getMethodOptions: function (name, type, path, typeName) {
		var nameOut = this._getMethodName(path, name);
		var typeOut = type.toLowerCase();
		var typeOutRaw = type.toLowerCase();
		var out;

		switch (typeOut) {
			case 'object':
				typeOut = 'Object';
				typeOutRaw = 'Object';
				break;
			case 'array':
				typeOut = 'Array<any>';
				typeOutRaw = 'Array';
				break;
		}

		out = {
			name: nameOut,
			nameDecapitalize: this.decapitalize(nameOut),
			typeRaw: typeOutRaw,
			path: this._getMethodPath(path, name)
		};

		out[typeName] = typeOut;

		return out;
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
		return this._replace(this._getterStr, this._getMethodOptions(name, type, path, 'returnType'));
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
		return this._replace(this._setterStr, this._getMethodOptions(name, type, path, 'valueType'));
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
		return this._replace(this._validStr, this._getMethodOptions(name, type, path, 'type'));
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
		this._argumentStr = this.readFile(__dirname + '/../src/templates/dto_' + this._options.jsVersion + '_argument.tpl');
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
