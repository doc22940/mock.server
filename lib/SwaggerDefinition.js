
'use strict';

var SwaggerUtils = require('./SwaggerUtils'),
	Utils = require('./Utils'),
	extend = require('util')._extend;

/**
 *
 * @class SwaggerDefinition
 * @namespace SwaggerImport
 * @param {string} name
 * @param {object} definition
 * @param {object} options
 * @constructor
 *
 * Swagger importer
 */
function SwaggerDefinition(name, definition, options) {
	this.init(name, definition, options);
}

SwaggerDefinition.prototype = extend(SwaggerDefinition.prototype, Utils.prototype);
SwaggerDefinition.prototype = extend(SwaggerDefinition.prototype, SwaggerUtils.prototype);
SwaggerDefinition.prototype = extend(SwaggerDefinition.prototype, {

	constructor : SwaggerDefinition,

	/**
	 *
	 * @method init
	 * called by constructor
	 * @param {string} name
	 * @param {object} definition
	 * @param {object} options
	 * @returns void
	 * @public
	 */
	init: function (name, definition, options) {

		this._name = name;
		this._str = '';
		this._def = {};
		this._defOriginal = definition;
		this._options = options;

		if (typeof definition === 'object') {
			this._def = this._formatDefinition(definition);
			this._str = JSON.stringify(this._def);
		}
	},

	/**
	 * @method mapReferences
	 * @returns {void}
	 * @public
	 */
	mapReferences: function () {
		this._str = this._mapReference(this._str, 0);
		this._def = JSON.parse(this._str);
	},

	/**
	 *
	 * @method setSwaggerDefinitions
	 * @param {object} swaggerDefinitions
	 * @public
	 */
	setSwaggerDefinitions: function (swaggerDefinitions) {
		this._swaggerDefinitions = swaggerDefinitions;
	},

	/**
	 *
	 * @method get
	 * @returns {object} definition
	 */
	get: function () {
		return this._def;
	},

	/**
	 *
	 * @method getString
	 * @returns {string} definitionString
	 */
	getString: function () {
		return this._str;
	},

	/**
	 * @method _mapReference
	 * @param {string} str
	 * @param {number} deep
	 * @returns {string} definitionString
	 * @private
	 */
	_mapReference: function (str, deep) {

		var _this = this,
			strSpl = str.split('{"$ref":'),
			out,
			outStr = [],
			regStr = '(^"#/definitions/)([^"}]*)("})',
			reg = new RegExp(regStr);

		/**
		 * @function _getSchemaString
		 * @param {Array} result
		 * @param {string} originalStrPart
		 * @returns {string} schemaString
		 * @private
		 */
		function _getSchemaString (result, originalStrPart) {

			if (!(result instanceof Array) || result.length < 3) {
				return originalStrPart;
			}

			var swaggerDefinition = _this._getDefinition(result[2]),
				out = originalStrPart,
				replaceStr = result[1] + result[2] + result[3];

			if (!swaggerDefinition) {
				out = out.replace(replaceStr, '{"type":"object","properties":{}}');
			} else {
				out = out.replace(replaceStr, swaggerDefinition.getString());
			}

			return out;
		}

		/**
		 * @function _mapItem
		 * @param {string} part
		 * @param {number} index
		 * @private
		 */
		function _mapItem (part, index) {
			if (index !== 0) {
				outStr.push(_getSchemaString(reg.exec(part), part));
			} else {
				outStr.push(strSpl[0]);
			}
		}

		if (strSpl.length > 0) {
			strSpl.map(_mapItem);
		}

		out = outStr.join('');

		// performance issue
		if (out.search(/\$ref/g) >= 0 && deep <= this._options.maxRefDeep) {
			out = this._mapReference(out, (deep + 1));
		}

		return out;
	},

	/**
	 *
	 * @method _getDefinition
	 * @param {string} name
	 * @returns {SwaggerPathMethod|boolean}
	 * @private
	 */
	_getDefinition: function (name) {
		if (!this._swaggerDefinitions.hasOwnProperty(name)) {
			return false;
		}

		return this._swaggerDefinitions[name];
	},

	/**
	 *
	 * @method _formatDefinition
	 * @param {object} def
	 * @returns {*}
	 * @private
	 */
	_formatDefinition: function (def) {

		this.forIn(def, function (key, value) {
			if (value.type) {
				def[key] = value.type;
			}
		});

		return def;
	},

	/**
	 *
	 * @method write
	 * @returns {void}
	 * @public
	 */
	write: function () {
		var dir = this._options.dest + '/_DTO',
			file = dir + '/' + this._name + '.json';

		this.writeDir(dir);
		this.writeFile(file, JSON.stringify(this.restructureSchema(this._defOriginal), null, 2));
	}

});

module.exports = SwaggerDefinition;