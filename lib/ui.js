
var path = require('path'),
	fs = require('fs'),
	getPreferences = require('./getPreferences'),
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

Ui.prototype = {
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
		this._swaggerImport = this._readSwaggerImportFile();
		this._isSwaggerImportAvailable = (typeof options.swaggerImport === 'object');

		this._readApi();
	},

	get: function (type) {

		var _ = this;

		switch (type) {
			case 'data': return _._data; break;
			case 'apiData': return _._data; break;
			case 'swaggerImport': return _._swaggerImport; break;
			case 'isSwaggerImportAvailable': return _._isSwaggerImportAvailable; break;
		}

	},

	_toId: function (value) {
		return value.replace(/[-_,.#\/\{\}]/g, '');
	},


	_readApi: function () {

		var _ = this,
			files = [];

		try {
			files = fs.readdirSync(_.options.restPath)
		} catch (err) {}

		helper._for(files, function (item) {
			if (item !== '.DS_Store' && item !== 'preferences.json' && item !== '.swagger_import.json') {
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

	_readApiMethods: function (path) {

		var _ = this,
			files = fs.readdirSync(path),
			data = [];

		function _getSchemaUrl (isRequest, path, item, isFileRaw) {

			var urlSpl = [],
				itemPath = path + '/' + item,
				paramUrl,
				paramType,
				urlPath,
				cleanPath = path.replace(_.options.restPath, '').replace(/#/g, '/').replace(/\/\//g, '/');

			if (isFileRaw) {
				urlPath = '/service/schema-file';
			} else {
				urlPath = '/service/schema';
			}

			if (isRequest) {
				paramType = '&type=Request';
				paramUrl = '?url=' + encodeURIComponent(itemPath + '/request_schema.json');
			} else {
				paramType = '&type=Response';
				paramUrl = '?url=' + encodeURIComponent(itemPath + '/response_schema.json');
			}

			if (isFileRaw) {
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
			urlSpl.push('&path=' +  encodeURIComponent(cleanPath));
			urlSpl.push('&method=' + item);

			return urlSpl.join('');
		}

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
					desc.request.schema.url = _getSchemaUrl(true, path, item, false);
					desc.request.schema.urlFile = _getSchemaUrl(true, path, item, true);
				}
				if (desc.response && desc.response.schema) {
					desc.response.schema.url = _getSchemaUrl(false, path, item, false);
					desc.response.schema.urlFile = _getSchemaUrl(false, path, item, true);
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

};

module.exports = Ui;

