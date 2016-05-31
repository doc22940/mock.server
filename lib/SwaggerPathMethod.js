'use strict';

var Utils = require('./Utils'),
	swaggerLog = require('./SwaggerLog'),
	extend = require('util')._extend;

/**
 *
 * @class SwaggerPathMethod
 * @namespace SwaggerImport
 * @param {string} name
 * @param {object} methodObject
 * @param {object} options
 * @constructor
 *
 * Swagger importer
 */
function SwaggerPathMethod(name, methodObject, options) {
	this.init(name, methodObject, options);
}

SwaggerPathMethod.prototype = extend(SwaggerPathMethod.prototype, Utils.prototype);
SwaggerPathMethod.prototype = extend(SwaggerPathMethod.prototype, {

	constructor : SwaggerPathMethod,

	/**
	 *
	 * @method init
	 * called by constructor
	 * @param {string} name
	 * @param {object} methodObject
	 * @param {string} methodObject.summary
	 * @param {string} methodObject.description
	 * @param {Array} methodObject.consumes
	 * @param {Array} methodObject.produces
	 * @param {Array} methodObject.parameters
	 * @param {object} methodObject.responses
	 * @param {object} options
	 * @returns void
	 * @public
	 */
	init: function (name, methodObject, options) {

		this._options = options;
		this._methodObject = methodObject;
		this._name = name;
		this._summary = methodObject.summary || '';
		this._description = methodObject.description || '';
		this._consumes = methodObject.consumes || [];
		this._produces = methodObject.produces || [];
		this._parameters = [];
		this._responses = {};
		this._swaggerDefinitions = {};
		this._requestSchemaRef = '';
		this._requestSchema = undefined;
		this._responseSchemaRef = '';
		this._responseSchema = undefined;

	},

	/**
	 *
	 * @method setDefinitions
	 * @param {object} swaggerDefinitions
	 * @returns {void}
	 * @protected
	 */
	setDefinitions: function (swaggerDefinitions) {
		this._swaggerDefinitions = swaggerDefinitions;
		this._parameters = this._mapParameters();
		this._responses = this._mapResponses();
	},

	/**
	 * @method getResponses
	 * @returns {string} responses
	 */
	getResponses: function () {
		return this._responses;
	},

	/**
	 * @method getParameters
	 * @returns {string} parameters
	 */
	getParameters: function () {
		return this._parameters;
	},

	/**
	 * @method getProduces
	 * @returns {string} produces
	 */
	getProduces: function () {
		return this._produces;
	},

	/**
	 * @method getConsumes
	 * @returns {string} consumes
	 */
	getConsumes: function () {
		return this._consumes;
	},

	/**
	 * @method getDescription
	 * @returns {string} description
	 */
	getDescription: function () {
		return this._description;
	},

	/**
	 * @method getName
	 * @returns {string} name
	 */
	getName: function () {
		return this._name;
	},

	/**
	 * @method getSummary
	 * @returns {string} summary
	 */
	getSummary: function () {
		return this._summary;
	},

	/**
	 * @method getDescriptionObject
	 * @returns {object} descriptionObject
	 * @public
	 */
	getDescriptionObject: function () {

		var paramsQuery = this.getParameters().query || [],
			paramsUri = this.getParameters().path || [],
			paramsBody = this.getParameters().body || [],
			request = {},
			descriptionObject;

		if (paramsQuery.length > 0) {
			request.query = {
				parameters: paramsQuery || []
			};
		}

		if (paramsUri.length > 0) {
			request.uri = {
				parameters: paramsUri || []
			};
		}

		if (paramsBody.length > 0) {
			request.body = {
				parameters: paramsBody || []
			};
			if (paramsBody[0].schemaType) {
				request.schema = {
					type: paramsBody[0].schemaType
				};
			}
		}

		descriptionObject = {
			desc: this.getSummary(),
			desc2: this.getDescription(),
			security: [],
			protected: false,
			status: 'swagger-imported',
			request: request,
			response: {
				statusCode: this.getResponses().join(', '),
				schema: {
					type: this.getProduces().join(', ')
				}
			}
		};

		return descriptionObject;
	},

	/**
	 *
	 * @method getRequestSchema
	 * @returns {string} schema
	 * @protected
	 */
	getRequestSchema: function () {

		if (this._requestSchema) {
			return this._requestSchema;
		} else if (this._requestSchemaRef !== '') {
			return this._getDefinition(this._requestSchemaRef).get();
		}

		return '';
	},

	/**
	 *
	 * @method getResponseSchema
	 * @returns {object} schema
	 * @protected
	 */
	getResponseSchema: function () {

		if (this._responseSchema) {
			return this._responseSchema;
		} else if (this._responseSchemaRef !== '') {
			return this._getDefinition(this._responseSchemaRef).get();
		}

		return {};
	},

	/**
	 *
	 * @method getResponseFakerData
	 * @returns {String} faker function
	 * @protected
	 */
	getResponseFakerData: function () {
		return this._responseFakerData;
	},

	/**
	 * @method _getDefinition
	 * @param {string} schemaRef
	 * @returns {SwaggerDefinition}
	 * @private
	 */
	_getDefinition: function (schemaRef) {

		var schemaName = schemaRef.replace('#/definitions/', '');

		if (!this._swaggerDefinitions.hasOwnProperty(schemaName)) {
			return {
				get: function () { return {};}
			};
		}

		return this._swaggerDefinitions[schemaName];
	},

	/**
	 *
	 * @method write
	 * @param {string} path
	 * @returns void
	 * @public
	 */
	write: function (path) {

		var dir = path + '/' + this.getName(),
			existDir = this.existDir(dir),
			fileSuccess = dir + '/mock/success.json',
			fileError = dir + '/mock/error.json',
			fileEmpty = dir + '/mock/empty.json';

		if (!existDir || (existDir && this._options.overwriteExistingDescriptions)) {

			this.writeDir(dir);
			this.writeFile(dir + '/desc.json', JSON.stringify(this.getDescriptionObject(), null, 2));
			this.writeFile(dir + '/request_schema.json', JSON.stringify(this.getRequestSchema(), null, 2));
			this.writeFile(dir + '/response_schema.json', JSON.stringify(this.getResponseSchema(), null, 2));
			this.writeDir(dir + '/mock');

			this.writeFile(dir + '/.is_swagger_imported', '');
			if (this.existFile(dir + '/.is_swagger_deprecated')) {
				this.removeFile(dir + '/.is_swagger_deprecated');
			}

			if (!this.existFile(fileSuccess)) {
				this.writeFile(fileSuccess, '{}');
			}
			if (this._options.createErrorFile && !this.existFile(fileError)) {
				this.writeFile(fileError, '{}');
			}
			if (this._options.createEmptyFile && !this.existFile(fileEmpty)) {
				this.writeFile(fileEmpty, '{}');
			}

			swaggerLog.success('directory written: <code>' + dir + '</code>');

		}
	},

	/**
	 *
	 * @method _mapResponses
	 * @returns {Array} responses
	 * @public
	 */
	_mapResponses: function () {

		var responses = this._methodObject.responses || {},
			outResponses = [];

		this.forIn(responses, function (key, response) {

			if (key === '200' && response.schema ) {

				outResponses.push(key);

				if (response.schema.$ref) {
					this._responseSchemaRef = response.schema.$ref;
				} else if (response.schema.type === 'array') {
					this._responseSchema = this._mapSchemaArray(response.schema);
				} else {
					this._responseSchema = response.schema;
				}

			}
		});

		return outResponses;
	},

	/**
	 *
	 * @method _mapParameters
	 * @returns {Object} parameters
	 * @public
	 */
	_mapParameters: function () {

		var _this = this,
			parameters = this._methodObject.parameters || [],
			outParameters = {};

		/**
		 * @function _loopParameter
		 * @param {object} parameter
		 * @param {string} parameter.in
		 * @param {string} parameter.name
		 * @param {string} parameter.type
		 * @param {string} parameter.description
		 * @param {boolean} parameter.required
		 * @param {object} parameter.schema
		 * @private
		 */
		function _loopParameter (parameter) {
			var param;

			if (!outParameters.hasOwnProperty(parameter.in)) {
				outParameters[parameter.in] = [];
			}

			param = {
				name: parameter.name || '',
				required: parameter.required,
				type: parameter.type || '',
				desc: parameter.description || ''
			};

			if (parameter.in === 'body' && parameter.schema) {
				if (parameter.schema.$ref) {
					_this._requestSchemaRef = parameter.schema.$ref;
					param.schemaType = _this.getConsumes().join(', ') + ' ';
				} else if (parameter.schema.type === 'array') {
					_this._requestSchema = _this._mapSchemaArray(parameter.schema);
					param.schemaType = _this.getConsumes().join(', ') + ' ';
				}
			}

			outParameters[parameter.in].push(param);
		}

		this.for(parameters, _loopParameter);

		return outParameters;
	},

	/**
	 *
	 * @method _mapSchemaArray
	 * @param {object} schema
	 * @returns {object}
	 * @private
	 */
	_mapSchemaArray: function (schema) {

		var schemaStr = JSON.stringify(schema).replace(/ /g, ''),
			reg = new RegExp('(^.*"\\$ref":")(#/[a-zA-Z]*/[a-zA-Z]*)("}})', 'g'),
			schemaRef = schemaStr.replace(reg, '$2');

		schema.items = this._getDefinition(schemaRef).get();

		return schema;
	}

});

module.exports = SwaggerPathMethod;