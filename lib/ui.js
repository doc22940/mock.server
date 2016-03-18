
var path = require('path'),
	fs = require('fs'),
	getPreferences = require('./getPreferences'),
	Utils = require('./Utils.js'),
	util = require('util'),
	extend = util._extend,
	helper = require('./helper');

'use strict';

/**
 *
 * @class Ui
 * @namespace Ui
 * @param {object} options
 * @constructor
 *
 */
function Ui(options) {
	this.init(options);
}

Ui.prototype = extend(Ui.prototype, Utils.prototype);
Ui.prototype = extend(Ui.prototype, {
	constructor : Ui,

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

	_toId: function (value) {
		return value.replace(/[-_,.#\/\{\}]/g, '');
	},


	_readDtos: function () {

		var path = this.options.restPath + '/_DTO',
			files = this.readDir(path, ['.DS_Store']);

		this.for(files, function (item) {
			this._dataDto.push(this._readDto(path, item.file));
		}.bind(this));
	},

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

	_readApi: function () {

		var _ = this,
			files = [];

		try {
			files = fs.readdirSync(_.options.restPath)
		} catch (err) {}

		helper._for(files, function (item) {
			if (item !== '_DTO' && item !== '.DS_Store' && item !== 'preferences.json' && item !== '.swagger_import.json') {
				_._data.push(_._readApiGroup(item));
			}
		});
	},

	/**
	 * @method _readSwaggerImportFile
	 * @returns {object} swaggerImport
	 * @private
	 */
	_readSwaggerImportFile: function () {

		var _ = this,
			data = undefined;

		try {
			data = fs.readFileSync(_.options.restPath + '/.swagger_import.json', 'utf8');
			data = JSON.parse(data.toString());
		} catch (err) {}

		if (data && data.dateTime) {
			return data;
		} else {
			return {};
		}

	},

	_readApiGroup: function (item) {

		var _ = this;

		return {
			name: item,
			id: _._toId(item),
			path: _.options.restPath,
			services: _._readApiService(item),
			preferences: getPreferences(_.options)
		};
	},

	_readApiService: function (groupItem) {

		var _ = this,
			path = _.options.restPath + '/' + groupItem,
			files = [],
			data = [];

		try {
			files = fs.readdirSync(path);
		} catch (err) {}

		helper._for(files, function (item) {
			if (item !== '.DS_Store') {
				var itemPath = path + '/' + item,
					name = groupItem;

				if (item !== '#') {
					name += '/' + item.replace(/#/g, '/').substr(1, 9999);
				}

				data.push({
					name: name,
					path: itemPath,
					id: _._toId(name),
					methods: _._readApiMethods(itemPath)
				});
			}
		});

		return data;
	},

	_getSchemaUrl: function (options) {

		var _ = this,
			urlSpl = [],
			itemPath = options.path + '/' + options.item,
			paramUrl,
			paramType,
			urlPath,
			cleanPath = options.path.replace(_.options.restPath, '').replace(/#/g, '/').replace(/\/\//g, '/');

		if (options.isFileRaw) {
			urlPath = '/service/schema-file';
		} else {
			urlPath = '/service/schema';
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
			urlSpl.push(_.options.urlBase);
			urlSpl.push(urlPath);
			urlSpl.push(paramUrl);

			return urlSpl.join('');
		}

		urlSpl.push(_.options.urlBase);
		urlSpl.push(urlPath);
		urlSpl.push(paramUrl);
		urlSpl.push(paramType);
		if (!options.isDto) {
			urlSpl.push('&path=' +  encodeURIComponent(cleanPath));
			urlSpl.push('&method=' + options.item);
		}


		return urlSpl.join('');
	},

	_readApiMethods: function (path) {

		var _ = this,
			files = fs.readdirSync(path),
			data = [];

		helper._for(files, function (item) {
			if (item !== '.DS_Store') {
				var itemPath = path + '/' + item,
					mockPath = itemPath + '/mock',
					name = item.replace(/#/g, '/'),
					nameLower = name.toLowerCase(),
					desc = _._readApiDesc(itemPath),
					statusClass = '',
					isDeprecated = _._isDeprecated(itemPath);

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
					desc.request.schema.url = _._getSchemaUrl({
						isRequest: true,
						path: path,
						item: item,
						isFileRaw: false,
						isDto: false
					});
					desc.request.schema.urlFile = _._getSchemaUrl({
						isRequest: true,
						path: path,
						item: item,
						isFileRaw: true,
						isDto: false
					});
				}
				if (desc.response && desc.response.schema) {
					desc.response.schema.url = _._getSchemaUrl({
						isRequest: false,
						path: path,
						item: item,
						isFileRaw: false,
						isDto: false
					});
					desc.response.schema.urlFile = _._getSchemaUrl({
						isRequest: false,
						path: path,
						item: item,
						isFileRaw: true,
						isDto: false
					});
				}

				var availableMockResponses = helper.readDir(mockPath, ['response.txt', '.DS_Store']),
					availableMockResponsesOut = [];

				availableMockResponses.forEach(function (mockItem) {
					var selected = 'success',
						validationFile,
						name = mockItem.file.replace('.json', '');

					if (name.search(/^\./) < 0) {
						try {
							selected = fs.readFileSync(mockPath + '/response.txt', 'utf8');
						} catch (err) {}
						try {
							validationFile = JSON.parse(fs.readFileSync(mockPath + '/.' + name + '_validation', 'utf8'));
						} catch (err) {}

						mockItem.isSelected = (selected === name);
						mockItem.name = mockItem.file.replace('.json', '');
						mockItem.isValidated = (validationFile !== undefined);

						if (mockItem.isValidated) {
							mockItem.isValid = (validationFile.counter < 1);
							mockItem.inValidCounter = validationFile.counter;
						}

						availableMockResponsesOut.push(mockItem);
					}
				});

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
					pathCleaned: path.replace(_.options.restPath, '').replace(/#/g, '/').replace(/\/\//g, '/'),
					desc: desc,
					statusClass: statusClass,
					security: (desc.security ? desc.security.join(', ') : ''),
					mockPath: mockPath + '/',
					availableMockResponses: availableMockResponsesOut,
					isDeprecated: isDeprecated ? 'Deprecated' : ''
				});
			}
		});

		return data;
	},

	_isDeprecated: function (path) {
		var fileData;

		if (typeof this._swaggerImport !== 'object' || !this._swaggerImport.dateTime) {
			return false;
		}

		try {
			fileData = fs.readFileSync(path + '/.is_swagger_deprecated', 'utf8');
		} catch (err) {}

		return (typeof fileData === 'string');
	},

	_readApiDesc: function (path) {

		var desc = '{}';

		try {
			desc = fs.readFileSync(path + '/desc.json', 'utf8')
		} catch (err) {}

		return JSON.parse(desc);
	}

});

module.exports = Ui;

