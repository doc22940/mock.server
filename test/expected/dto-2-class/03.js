
'use strict';

/**
 *
 * @class AddressWsDTO
 * @param {object} data
 * @constructor
 *
 */
function AddressWsDTO(data) {
	this.init(data);
}

AddressWsDTO.prototype = {

	constructor : AddressWsDTO,

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
	 * @method getCountry
	 * @returns {Object|Array}
	 * @public
	 */
	getCountry: function () {
		return this._data.country;
	},

	/**
	 *
	 * @method getCountryIsocode
	 * @returns {String}
	 * @public
	 */
	getCountryIsocode: function () {
		return this._data.countryIsocode;
	},

	/**
	 *
	 * @method hasValidCountryIsocode
	 * @public
	 */
	hasValidCountryIsocode: function () {
		try {
			var v = this._data.countryIsocode;
			if (v && this._is('String', v)) {
				return true;
			}
		} catch (err) {
			return false;
		}

		return false;
	},

	/**
	 *
	 * @method getCountry2
	 * @returns {Object|Array}
	 * @public
	 */
	getCountry2: function () {
		return this._data.country2;
	},

	/**
	 *
	 * @method getEmail
	 * @returns {String}
	 * @public
	 */
	getEmail: function () {
		return this._data.email;
	},

	/**
	 *
	 * @method hasValidEmail
	 * @public
	 */
	hasValidEmail: function () {
		try {
			var v = this._data.email;
			if (v && this._is('String', v)) {
				return true;
			}
		} catch (err) {
			return false;
		}

		return false;
	},

	/**
	 *
	 * @method getFirstName
	 * @returns {String}
	 * @public
	 */
	getFirstName: function () {
		return this._data.firstName;
	},

	/**
	 *
	 * @method hasValidFirstName
	 * @public
	 */
	hasValidFirstName: function () {
		try {
			var v = this._data.firstName;
			if (v && this._is('String', v)) {
				return true;
			}
		} catch (err) {
			return false;
		}

		return false;
	},

	/**
	 *
	 * @method getId
	 * @returns {String}
	 * @public
	 */
	getId: function () {
		return this._data.id;
	},

	/**
	 *
	 * @method hasValidId
	 * @public
	 */
	hasValidId: function () {
		try {
			var v = this._data.id;
			if (v && this._is('String', v)) {
				return true;
			}
		} catch (err) {
			return false;
		}

		return false;
	},

	/**
	 *
	 * @method getLastName
	 * @returns {String}
	 * @public
	 */
	getLastName: function () {
		return this._data.lastName;
	},

	/**
	 *
	 * @method hasValidLastName
	 * @public
	 */
	hasValidLastName: function () {
		try {
			var v = this._data.lastName;
			if (v && this._is('String', v)) {
				return true;
			}
		} catch (err) {
			return false;
		}

		return false;
	},

	/**
	 *
	 * @method getLine1
	 * @returns {String}
	 * @public
	 */
	getLine1: function () {
		return this._data.line1;
	},

	/**
	 *
	 * @method hasValidLine1
	 * @public
	 */
	hasValidLine1: function () {
		try {
			var v = this._data.line1;
			if (v && this._is('String', v)) {
				return true;
			}
		} catch (err) {
			return false;
		}

		return false;
	},

	/**
	 *
	 * @method getPhone
	 * @returns {String}
	 * @public
	 */
	getPhone: function () {
		return this._data.phone;
	},

	/**
	 *
	 * @method hasValidPhone
	 * @public
	 */
	hasValidPhone: function () {
		try {
			var v = this._data.phone;
			if (v && this._is('String', v)) {
				return true;
			}
		} catch (err) {
			return false;
		}

		return false;
	},

	/**
	 *
	 * @method getPostalCode
	 * @returns {String}
	 * @public
	 */
	getPostalCode: function () {
		return this._data.postalCode;
	},

	/**
	 *
	 * @method hasValidPostalCode
	 * @public
	 */
	hasValidPostalCode: function () {
		try {
			var v = this._data.postalCode;
			if (v && this._is('String', v)) {
				return true;
			}
		} catch (err) {
			return false;
		}

		return false;
	},

	/**
	 *
	 * @method getStreetName
	 * @returns {String}
	 * @public
	 */
	getStreetName: function () {
		return this._data.streetName;
	},

	/**
	 *
	 * @method hasValidStreetName
	 * @public
	 */
	hasValidStreetName: function () {
		try {
			var v = this._data.streetName;
			if (v && this._is('String', v)) {
				return true;
			}
		} catch (err) {
			return false;
		}

		return false;
	},

	/**
	 *
	 * @method getStreetNumber
	 * @returns {String}
	 * @public
	 */
	getStreetNumber: function () {
		return this._data.streetNumber;
	},

	/**
	 *
	 * @method hasValidStreetNumber
	 * @public
	 */
	hasValidStreetNumber: function () {
		try {
			var v = this._data.streetNumber;
			if (v && this._is('String', v)) {
				return true;
			}
		} catch (err) {
			return false;
		}

		return false;
	},

	/**
	 *
	 * @method getTitle
	 * @returns {String}
	 * @public
	 */
	getTitle: function () {
		return this._data.title;
	},

	/**
	 *
	 * @method hasValidTitle
	 * @public
	 */
	hasValidTitle: function () {
		try {
			var v = this._data.title;
			if (v && this._is('String', v)) {
				return true;
			}
		} catch (err) {
			return false;
		}

		return false;
	},

	/**
	 *
	 * @method getTitleCode
	 * @returns {String}
	 * @public
	 */
	getTitleCode: function () {
		return this._data.titleCode;
	},

	/**
	 *
	 * @method hasValidTitleCode
	 * @public
	 */
	hasValidTitleCode: function () {
		try {
			var v = this._data.titleCode;
			if (v && this._is('String', v)) {
				return true;
			}
		} catch (err) {
			return false;
		}

		return false;
	},

	/**
	 *
	 * @method getTown
	 * @returns {String}
	 * @public
	 */
	getTown: function () {
		return this._data.town;
	},

	/**
	 *
	 * @method hasValidTown
	 * @public
	 */
	hasValidTown: function () {
		try {
			var v = this._data.town;
			if (v && this._is('String', v)) {
				return true;
			}
		} catch (err) {
			return false;
		}

		return false;
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
	}

};