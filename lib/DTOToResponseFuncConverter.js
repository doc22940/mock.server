
'use strict';

var extend = require('util')._extend,
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
		responseFuncRules: {}
	},

	/**
	 *
	 * @method init
	 * called by constructor
	 * @param {string} name
	 * @param {object} dtoJson
	 * @param {object} options
	 * @param {object} options.responseFuncRules
	 * @param {string|undefined} options.responseFuncPath
	 * @public
	 */
	init: function (name, dtoJson, options) {

		options = extend(this._defaults, options || {});

		this._options = options;
		this._path = this._options.responseFuncPath;
		this._rules = this._options.responseFuncRules;
		this._name = name;
		this._json = undefined;
		this._result = undefined;

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
			typeof this._json === 'object'
		);
	},

	/**
	 * @method create
	 * @returns {object} result
	 * @public
	 */
	create: function () {

		if (!this._isValid()) {
			return {};
		}

		this._result = this._mapUnknown(this._json, '');
		return this._result;
	},

	/**
	 * @method _mapUnknown
	 * @param {Object} data
	 * @param {String|undefined} key
	 * @private
	 */
	_mapUnknown: function (data, key) {

		var ruleMapObj;

		if (this._rules[key]) {
			ruleMapObj = this._mapRule(this._rules[key], data);
			if (ruleMapObj.valid) {
				return ruleMapObj.rule;
			}
		}

		if (data instanceof Array) {
			return this._mapArray(data);
		}

		if (typeof data === 'object') {
			return this._mapObject(data);
		}

		if (typeof data === 'string') {
			return this._mapTypeString(data, key);
		}

		return data;
	},

	/**
	 * @method _mapRule
	 * @param {*} rule
	 * @param {*} data
	 * @returns {object}
	 * @private
	 */
	_mapRule: function (rule, data) {

		var inValid = {
				valid: false
			},
			isValid = (this.typeOf(rule) === this.typeOf(data));

		if (typeof rule !== 'object') {
			if (!isValid) {
				return inValid;
			}
			return {
				rule: rule,
				valid: (typeof rule === data)
			};
		}

		if (rule instanceof Array) {
			if (!isValid) {
				return inValid;
			}
			return {
				rule: this._mapArray(rule),
				valid: true
			};
		}

		if (rule.faker) {
			if (rule.fakerArgs) {
				return {
					rule: this._getFaker(rule.faker, JSON.stringify(rule.fakerArgs)),
					valid: true
				};
			}

			return {
				rule: this._getFaker(rule.faker, ''),
				valid: true
			};
		} else {
			if (!isValid) {
				return inValid;
			}
			return {
				rule: this._mapUnknown(rule, ''),
				valid: true
			};
		}


	},

	/**
	 * @method _mapArray
	 * @param {Object} obj
	 * @private
	 */
	_mapArray: function (obj) {

		var out = [],
			tpl = this.readFile(__dirname + '/../src/templates/func-array.tpl'),
			data;

		if (!obj || !obj[0]) {
			return out;
		}

		data = JSON.stringify(this._mapUnknown(obj[0], ''), null, 2);
		data = this._replaceWrapper(data);

		return '<%>' + tpl.replace('<%=data%>', data).replace(/(?:\r\n|\r|\n)/g, '').replace(/\t/g, '') + '<%>';
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
	 * @method _mapTypeString
	 * @param {String} value
	 * @param {String|undefined} key
	 * @private
	 */
	_mapTypeString: function (value, key) {

		if (value.search(/^\$ref-/) >= 0) {
			return this._mapReference(value);
		}

		if (value === 'number') {
			return this._mapNumber();
		}

		if (value === 'string') {
			return this._mapString(key);
		}

	},

	/**
	 * @method _mapString
	 * @param {String} key
	 * @private
	 */
	_mapString: function (key) {

		var _has;

		_has = function (search) {
			return this._isPart(key, search);
		}.bind(this);

		if (_has('name')) {

			if (_has('first')) {
				return this._getFaker('name.firstName', '');
			}
			if (_has('last')) {
				return this._getFaker('name.lastName', '');
			}
			if (_has('street')) {
				return this._getFaker('address.streetName', '');
			}
			return this._getFaker('name.findName', '');
		}

		if (_has('country')) {
			if (_has('code')) {
				return '"CH"';
			}
			return this._getFaker('address.ukCountry', '');
		}

		if (_has('zip') || _has('postal')) {
			return this._getFaker('address.zipCode', '');
		}

		if (_has('city') || _has('town')) {
			return this._getFaker('address.city', '');
		}

		if (_has('street')) {
			if (_has('number')) {
				return this._getFaker('random.number', '');
			}
			return this._getFaker('address.streetName', '');
		}

		if (_has('phone')) {
			return this._getFaker('phone.phoneNumber', '');
		}

		if (_has('email')) {
			return this._getFaker('internet.email', '');
		}

		if (_has('userName')) {
			return this._getFaker('internet.userName', '');
		}

		if (_has('domain')) {
			return this._getFaker('internet.domainName', '');
		}

		if (_has('company')) {
			return this._getFaker('company.companyName', '');
		}

		if (_has('image')) {
			return this._getFaker('image.nature', '');
		}

		if (_has('title')) {
			if (_has('code')) {
				return this._getFaker('random.arrayElement', '["mr","ms"]');
			}
			return this._getFaker('name.prefix', '');
		}

		return this._getFaker('lorem.word', '');
	},

	/**
	 * @method _isPart
	 * @param {string} value
	 * @param {string} search
	 * @returns {boolean}
	 * @private
	 */
	_isPart: function (value, search) {
		return (value.toLowerCase().search(search) >= 0);
	},

	/**
	 * @method _mapNumber
	 * @returns {String}
	 * @private
	 */
	_mapNumber: function () {
		return this._getFaker('random.number', '');
	},

	/**
	 * @method _getFaker
	 * @param {String} path
	 * @param {String,undefined} args
	 * @returns {String}
	 * @private
	 */
	_getFaker: function (path, args) {
		return '<%>faker.' + path + '(' + args + ')<%>';
	},

	/**
	 * @method _mapReference
	 * @param {String} refString
	 * @returns {String}
	 * @private
	 */
	_mapReference: function (refString) {
		var name = refString.replace('$ref-', '');
		return '<%>JSON.parse(require(\'../func-imported/' + name + '.js\').' + responsePreKey + name + '())<%>';
	},

	/**
	 * @method _getFile
	 * @param {String} funcName
	 * @param {Object} data
	 * @returns {String}
	 * @private
	 */
	_getFile: function (funcName, data) {
		return this._replaceWrapper(this.readFile(__dirname + '/../src/templates/func.tpl')
			.replace('<%=funcName%>', responsePreKey + funcName)
			.replace('<%=data%>', JSON.stringify(data, null, 2))
		);
	},

	_replaceWrapper: function (value) {
		return value
			.replace(/"<%>/g, '')
			.replace(/<%>"/g, '')
			.replace(/\\"/g, '"')
			.replace(/\\"/g, '"')
			.replace(/""/g, '"')
		;
	},

	/**
	 * @method write
	 * @returns {void}
	 * @public
	 */
	write: function () {

		if (!this._isValid()) {
			return;
		}

		if (typeof this._result !== 'object') {
			this._result = {};
		}

		if (!this.existDir(this._path)) {
			this.writeDir(this._path);
		}

		this.writeFile(this._path + '/' + this._name + '.js', this._getFile(this._name, this._result));
	}

});

module.exports = DTOToResponseFuncConverter;