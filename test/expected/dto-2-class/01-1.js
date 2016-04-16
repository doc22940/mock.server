
'use strict';

/**
 *
 * @class ComplexDTO
 * @param {object} data
 * @constructor
 *
 */
function ComplexDTO(data) {
	this.init(data);
}

ComplexDTO.prototype = {

	constructor : ComplexDTO,

	/**
	 *
	 * @method init
	 * called by constructor
	 * @param {Object} data
	 * @public
	 */
	init: function (data) {
		this._data = data;
	},

	/**
	 *
	 * @method _is
	 * @param {String} type
	 * @param {*} value
	 * @private
	 */
	_is: function (type, value) {
		switch (type) {
			case 'Array': return (value instanceof Array);
			default: return (typeof value === type.toLowerCase());
		}
	},

	/**
	 *
	 * @method getList
	 * @returns {Array}
	 * @public
	 */
	getList: function () {
		return this._data.list;
	},

	/**
	 *
	 * @method setList
	 * @param {Array} value
	 * @public
	 */
	setList: function (value) {
		this._data.list = value;
	},

	/**
	 *
	 * @method hasValidList
	 * @public
	 */
	hasValidList: function () {
		try {
			var v = this._data.list;
			if (v && this._is('Array', v)) {
				return true;
			}
		} catch (err) {
			return false;
		}

		return false;
	},

	/**
	 *
	 * @method getItems
	 * @returns {Array}
	 * @public
	 */
	getItems: function () {
		return this._data.items;
	},

	/**
	 *
	 * @method setItems
	 * @param {Array} value
	 * @public
	 */
	setItems: function (value) {
		this._data.items = value;
	},

	/**
	 *
	 * @method hasValidItems
	 * @public
	 */
	hasValidItems: function () {
		try {
			var v = this._data.items;
			if (v && this._is('Array', v)) {
				return true;
			}
		} catch (err) {
			return false;
		}

		return false;
	},

	/**
	 *
	 * @method getParametersAdditional
	 * @returns {String}
	 * @public
	 */
	getParametersAdditional: function () {
		return this._data.parameters.additional;
	},

	/**
	 *
	 * @method setParametersAdditional
	 * @param {String} value
	 * @public
	 */
	setParametersAdditional: function (value) {
		this._data.parameters.additional = value;
	},

	/**
	 *
	 * @method hasValidParametersAdditional
	 * @public
	 */
	hasValidParametersAdditional: function () {
		try {
			var v = this._data.parameters.additional;
			if (v && this._is('String', v)) {
				return true;
			}
		} catch (err) {
			return false;
		}

		return false;
	}

};