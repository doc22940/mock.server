
'use strict';

var Utils = require('../lib/Utils'),
	extend = require('util')._extend;

/**
 *
 * @class SwaggerUtils
 * @namespace SwaggerImport
 * @constructor
 *
 * Swagger importer
 */
function SwaggerUtils() {
	this.init();
}

SwaggerUtils.prototype = extend(SwaggerUtils.prototype, Utils.prototype);
SwaggerUtils.prototype =  extend(SwaggerUtils.prototype, {

	constructor : SwaggerUtils,

	/**
	 *
	 * @method init
	 * called by constructor
	 * @returns void
	 * @public
	 */
	init: function () {
		
	},

	restructureSchema: function (swaggerSchema) {
		console.dir(swaggerSchema);
		return this._map(swaggerSchema);
	},

	_map: function (object) {
		if (typeof object.properties === 'object') {
			return this._mapObject(object.properties);
		}
	},

	_mapObject: function (object) {
		var out = {};

		this.forIn(object, function (key, value) {
			if (value.type && typeof value.type === 'string') {
				out[key] = value.type;
			}

			if (value['$ref'] && typeof value['$ref'] === 'string') {
				out[key] = '$ref-' + value['$ref'];
			}
		});

		return out;
	}

});

module.exports = SwaggerUtils;