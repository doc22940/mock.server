
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
	 * @method setCountry
	 * @param {Object|Array} value
	 * @public
	 */
	setCountry: function (value) {
		this._data.country = value;
	},

	/**
	 *
	 * @method setCountryIsocode
	 * @param {String} value
	 * @public
	 */
	setCountryIsocode: function (value) {
		this._data.countryIsocode = value;
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
	 * @method setCountry2
	 * @param {Object|Array} value
	 * @public
	 */
	setCountry2: function (value) {
		this._data.country2 = value;
	},

	/**
	 *
	 * @method setEmail
	 * @param {String} value
	 * @public
	 */
	setEmail: function (value) {
		this._data.email = value;
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
	 * @method setFirstName
	 * @param {String} value
	 * @public
	 */
	setFirstName: function (value) {
		this._data.firstName = value;
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
	 * @method setId
	 * @param {String} value
	 * @public
	 */
	setId: function (value) {
		this._data.id = value;
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
	 * @method setLastName
	 * @param {String} value
	 * @public
	 */
	setLastName: function (value) {
		this._data.lastName = value;
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
	 * @method setLine1
	 * @param {String} value
	 * @public
	 */
	setLine1: function (value) {
		this._data.line1 = value;
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
	 * @method setPhone
	 * @param {String} value
	 * @public
	 */
	setPhone: function (value) {
		this._data.phone = value;
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
	 * @method setPostalCode
	 * @param {String} value
	 * @public
	 */
	setPostalCode: function (value) {
		this._data.postalCode = value;
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
	 * @method setStreetName
	 * @param {String} value
	 * @public
	 */
	setStreetName: function (value) {
		this._data.streetName = value;
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
	 * @method setStreetNumber
	 * @param {String} value
	 * @public
	 */
	setStreetNumber: function (value) {
		this._data.streetNumber = value;
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
	 * @method setTitle
	 * @param {String} value
	 * @public
	 */
	setTitle: function (value) {
		this._data.title = value;
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
	 * @method setTitleCode
	 * @param {String} value
	 * @public
	 */
	setTitleCode: function (value) {
		this._data.titleCode = value;
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
	 * @method setTown
	 * @param {String} value
	 * @public
	 */
	setTown: function (value) {
		this._data.town = value;
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
	}

};