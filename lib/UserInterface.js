
'use strict';

var path = require('path'),
	Utils = require('./Utils.js'),
	extend = require('util')._extend;

/**
 *
 * @class UserInterface
 * @namespace UserInterface
 * @param {object} options
 * @constructor
 *
 */
function UserInterface(options) {
	this.init(options);
}

UserInterface.prototype = extend(UserInterface.prototype, Utils.prototype);
UserInterface.prototype = extend(UserInterface.prototype, {
	constructor : UserInterface,

	/**
	 *
	 * @method init
	 * called by constructor
	 * @param {object} options
	 */
	init: function (options) {

		this.options = options;
		this._data = [];
		this._dataDto = [];
		this._swaggerImport = this._readSwaggerImportFile();
		this._isSwaggerImportAvailable = (typeof options.swaggerImport === 'object');

		this._readApi();
		this._readDtos();
	},

	/**
	 * @method get
	 * @returns {*}
	 * @public
	 */
	get: function (type) {

		var _ = this;

		switch (type) {
			case 'data': return _._data; break;
			case 'apiData': return _._data; break;
			case 'dataDto': return _._dataDto; break;
			case 'swaggerImport': return _._swaggerImport; break;
			case 'isSwaggerImportAvailable': return _._isSwaggerImportAvailable; break;
		}

	},

	/**
	 * @method _toId
	 * @returns {string}
	 * @private
	 */
	_toId: function (value) {
		return value.replace(/[-_,.#\/\{}]/g, '');
	},

	/**
	 * @method _readDtos
	 * @returns {void}
	 * @private
	 */
	_readDtos: function () {

		var path = this.options.restPath + '/_DTO',
			files = this.readDir(path, ['.DS_Store']);

		this.for(files, function (item) {
			this._dataDto.push(this._readDto(path, item.file));
		}.bind(this));
	},

	/**
	 * @method _readDto
	 * @param {string} path
	 * @param {string} fileName
	 * @returns {object}
	 * @private
	 */
	_readDto: function (path, fileName) {

		var schemaFileObj,
			schemaObj = {
				isRequest: false,
				path: path,
				item: fileName,
				isFileRaw: false,
				isDto: true
			};

		schemaFileObj = extend({}, schemaObj);
		schemaFileObj.isFileRaw = true;

		return {
			name: fileName,
			nameClean: fileName.replace('.json', ''),
			data: JSON.parse(this.readFile(path + '/' + fileName)),
			url: this.options.urlBase,
			path: path + '/' + fileName,
			schemaUrl: this._getSchemaUrl(schemaObj),
			schemaFileUrl: this._getSchemaUrl(schemaFileObj)
		};
	},

	/**
	 * @method _readApi
	 * @returns {void}
	 * @private
	 */
	_readApi: function () {

		var files = [];

		try {
			files = this.readDir(this.options.restPath, ['_DTO','.DS_Store','preferences.json','.swagger_import.json']);
		} catch (err) {}

		this.for(files, function (item) {
			this._data.push(this._readApiGroup(item.file));
		}.bind(this));
	},

	/**
	 * @method _readSwaggerImportFile
	 * @returns {object} swaggerImport
	 * @private
	 */
	_readSwaggerImportFile: function () {

		var data = undefined;

		try {
			data = this.readFile(this.options.restPath + '/.swagger_import.json');
			data = JSON.parse(data.toString());
		} catch (err) {}

		if (data && data.dateTime) {
			return data;
		} else {
			return {};
		}

	},

	/**
	 * @method _readApiGroup
	 * @param {string} item
	 * @returns {object}
	 * @private
	 */
	_readApiGroup: function (item) {
		return {
			name: item,
			id: this._toId(item),
			path: this.options.restPath,
			services: this._readApiService(item),
			preferences: this.getPreferences(this.options)
		};
	},

	/**
	 * @method _readApiService
	 * @param {string} groupItem
	 * @returns {Array}
	 * @private
	 */
	_readApiService: function (groupItem) {

		var path = this.options.restPath + '/' + groupItem,
			files = [],
			data = [];

		try {
			files = this.readDir(path, ['.DS_Store']);
		} catch (err) {}

		this.for(files, function (item) {
			var itemPath = path + '/' + item.file,
				name = groupItem;

			if (item.file !== '#') {
				name += '/' + item.file.replace(/#/g, '/').substr(1, 9999);
			}

			data.push({
				name: name,
				path: itemPath,
				id: this._toId(name),
				methods: this._readApiMethods(itemPath)
			});
		}.bind(this));

		return data;
	},

	/**
	 * @method _getSchemaUrl
	 * @param {object} options
	 * @returns {string}
	 * @private
	 */
	_getSchemaUrl: function (options) {

		var urlSpl = [],
			itemPath = options.path + '/' + options.item,
			paramUrl,
			paramType,
			urlPath,
			cleanPath = options.path.replace(this.options.restPath, '').replace(/#/g, '/').replace(/\/\//g, '/');

		if (options.isFileRaw) {
			urlPath = '/view/schema/file';
		} else {
			urlPath = '/view/schema';
		}

		if (options.isRequest) {
			paramType = '&type=Request';
			paramUrl = '?url=' + encodeURIComponent(itemPath + '/request_schema.json');
		} else if (options.isDto) {
			paramType = '&type=DTO';
			paramUrl = '?url=' + encodeURIComponent(itemPath);
		} else {
			paramType = '&type=Response';
			paramUrl = '?url=' + encodeURIComponent(itemPath + '/response_schema.json');
		}

		if (options.isFileRaw) {
			urlSpl.push('view-source:');
			urlSpl.push(this.options.urlBase);
			urlSpl.push(urlPath);
			urlSpl.push(paramUrl);

			return urlSpl.join('');
		}

		urlSpl.push(this.options.urlBase);
		urlSpl.push(urlPath);
		urlSpl.push(paramUrl);
		urlSpl.push(paramType);
		if (!options.isDto) {
			urlSpl.push('&path=' +  encodeURIComponent(cleanPath));
			urlSpl.push('&method=' + options.item);
		}


		return urlSpl.join('');
	},

	/**
	 * @method _readApiMethods
	 * @param {string} path
	 * @returns {Array}
	 * @private
	 */
	_readApiMethods: function (path) {

		var files = this.readDir(path, ['.DS_Store']),
			data = [];

		this.for(files, function (dirItem) {
			var item = dirItem.file,
				itemPath = path + '/' + item,
				mockPath = itemPath + '/mock',
				name = item.replace(/#/g, '/'),
				nameLower = name.toLowerCase(),
				desc = this._readApiDesc(itemPath),
				statusClass = '',
				isDeprecated = this._isDeprecated(itemPath);

			switch (desc.status) {
				case "process":
					statusClass = 'info';
					break;
				case "approve":
					statusClass = 'primary';
					break;
				case "approved":
					statusClass = 'success';
					break;
				case "blocked":
					statusClass = 'danger';
					break;
				default:
					statusClass = 'warning';
					break;
			}

			if (desc.request && desc.request.schema) {
				desc.request.schema.url = this._getSchemaUrl({
					isRequest: true,
					path: path,
					item: item,
					isFileRaw: false,
					isDto: false
				});
				desc.request.schema.urlFile = this._getSchemaUrl({
					isRequest: true,
					path: path,
					item: item,
					isFileRaw: true,
					isDto: false
				});
			}
			if (desc.response && desc.response.schema) {
				desc.response.schema.url = this._getSchemaUrl({
					isRequest: false,
					path: path,
					item: item,
					isFileRaw: false,
					isDto: false
				});
				desc.response.schema.urlFile = this._getSchemaUrl({
					isRequest: false,
					path: path,
					item: item,
					isFileRaw: true,
					isDto: false
				});
			}

			var availableMockResponses = this.readDir(mockPath, ['response.txt', '.DS_Store']),
				availableMockResponsesOut = [];

			this.for(availableMockResponses, function (mockItem) {
				var selected = 'success',
					methodStore = this.getMethodStore(itemPath),
					validationResult,
					name = mockItem.file.replace('.json', '');

				if (name.search(/^\./) >= 0) {
					return;
				}

				if (name.search(/\.headers$/) >= 0) {
					return;
				}

				try {
					selected = this.readFile(mockPath + '/response.txt');
				} catch (err) {}

				try {
					validationResult = methodStore.validation[name].counter;
				} catch (err) {}

				mockItem.isSelected = (selected === name);
				mockItem.name = mockItem.file.replace('.json', '');
				mockItem.isValidated = (validationResult !== undefined);

				if (mockItem.isValidated) {
					mockItem.isValid = (validationResult < 1);
					mockItem.inValidCounter = validationResult;
				}

				availableMockResponsesOut.push(mockItem);
			}.bind(this));

			if (isDeprecated) {
				desc.status = 'Deprecated';
				statusClass = 'danger';
			}

			if (desc.status === 'swagger-imported') {
				desc.status = 'Imported';
				statusClass = 'success';
			}

			data.push({
				id: nameLower,
				name: name,
				nameLower: nameLower,
				isProtected: desc.protected,
				basePath: path,
				path: itemPath,
				pathCleaned: path.replace(this.options.restPath, '').replace(/#/g, '/').replace(/\/\//g, '/'),
				desc: desc,
				statusClass: statusClass,
				security: (desc.security ? desc.security.join(', ') : ''),
				mockPath: mockPath + '/',
				availableMockResponses: availableMockResponsesOut,
				isDeprecated: isDeprecated ? 'Deprecated' : ''
			});
		}.bind(this));

		return data;
	},

	/**
	 * @method _isDeprecated
	 * @param {string} path
	 * @returns {boolean}
	 * @private
	 */
	_isDeprecated: function (path) {
		var fileData;

		if (typeof this._swaggerImport !== 'object' || !this._swaggerImport.dateTime) {
			return false;
		}

		try {
			fileData = this.readFile(path + '/.is_swagger_deprecated');
		} catch (err) {}

		return (typeof fileData === 'string');
	},

	/**
	 * @method _readApiDesc
	 * @param {string} path
	 * @returns {object}
	 * @private
	 */
	_readApiDesc: function (path) {

		var desc = '{}';

		try {
			desc = this.readFile(path + '/desc.json');
		} catch (err) {}

		return JSON.parse(desc);
	}

});

module.exports = UserInterface;

