
'use strict';

/**
 *
 * @class AddressWsDTO
 * @param {object} data
 * @constructor
 *
 */
class AddressWsDTO {

	/**
	 *
	 * @method constructor
	 * @param {Object} data
	 * @public
	 */
	constructor(data) {
		this._data = data;
	}

	/**
	 *
	 * @method _is
	 * @param {String} type
	 * @param {*} value
	 * @private
	 */
	_is(type, value) {
		switch (type) {
			case 'Array': return (value instanceof Array);
			default: return (typeof value === type.toLowerCase());
		}
	}

	/**
	 *
	 * @method getCountry
	 * @returns {Object|Array}
	 * @public
	 */
	getCountry () {
		return this._data.country;
	}

	/**
	 *
	 * @method setCountry
	 * @param {Object|Array} value
	 * @public
	 */
	setCountry (value) {
		this._data.country = value;
	}

	/**
	 *
	 * @method getCountryIsocode
	 * @returns {String}
	 * @public
	 */
	getCountryIsocode () {
		return this._data.countryIsocode;
	}

	/**
	 *
	 * @method setCountryIsocode
	 * @param {String} value
	 * @public
	 */
	setCountryIsocode (value) {
		this._data.countryIsocode = value;
	}

	/**
	 *
	 * @method hasValidCountryIsocode
	 * @public
	 */
	hasValidCountryIsocode () {
		try {
			let v = this._data.countryIsocode;
			if (v && this._is('String', v)) {
				return true;
			}
		} catch (err) {
			return false;
		}

		return false;
	}

	/**
	 *
	 * @method getCountry2
	 * @returns {Object|Array}
	 * @public
	 */
	getCountry2 () {
		return this._data.country2;
	}

	/**
	 *
	 * @method setCountry2
	 * @param {Object|Array} value
	 * @public
	 */
	setCountry2 (value) {
		this._data.country2 = value;
	}

	/**
	 *
	 * @method getEmail
	 * @returns {String}
	 * @public
	 */
	getEmail () {
		return this._data.email;
	}

	/**
	 *
	 * @method setEmail
	 * @param {String} value
	 * @public
	 */
	setEmail (value) {
		this._data.email = value;
	}

	/**
	 *
	 * @method hasValidEmail
	 * @public
	 */
	hasValidEmail () {
		try {
			let v = this._data.email;
			if (v && this._is('String', v)) {
				return true;
			}
		} catch (err) {
			return false;
		}

		return false;
	}

	/**
	 *
	 * @method getFirstName
	 * @returns {String}
	 * @public
	 */
	getFirstName () {
		return this._data.firstName;
	}

	/**
	 *
	 * @method setFirstName
	 * @param {String} value
	 * @public
	 */
	setFirstName (value) {
		this._data.firstName = value;
	}

	/**
	 *
	 * @method hasValidFirstName
	 * @public
	 */
	hasValidFirstName () {
		try {
			let v = this._data.firstName;
			if (v && this._is('String', v)) {
				return true;
			}
		} catch (err) {
			return false;
		}

		return false;
	}

	/**
	 *
	 * @method getId
	 * @returns {String}
	 * @public
	 */
	getId () {
		return this._data.id;
	}

	/**
	 *
	 * @method setId
	 * @param {String} value
	 * @public
	 */
	setId (value) {
		this._data.id = value;
	}

	/**
	 *
	 * @method hasValidId
	 * @public
	 */
	hasValidId () {
		try {
			let v = this._data.id;
			if (v && this._is('String', v)) {
				return true;
			}
		} catch (err) {
			return false;
		}

		return false;
	}

	/**
	 *
	 * @method getLastName
	 * @returns {String}
	 * @public
	 */
	getLastName () {
		return this._data.lastName;
	}

	/**
	 *
	 * @method setLastName
	 * @param {String} value
	 * @public
	 */
	setLastName (value) {
		this._data.lastName = value;
	}

	/**
	 *
	 * @method hasValidLastName
	 * @public
	 */
	hasValidLastName () {
		try {
			let v = this._data.lastName;
			if (v && this._is('String', v)) {
				return true;
			}
		} catch (err) {
			return false;
		}

		return false;
	}

	/**
	 *
	 * @method getLine1
	 * @returns {String}
	 * @public
	 */
	getLine1 () {
		return this._data.line1;
	}

	/**
	 *
	 * @method setLine1
	 * @param {String} value
	 * @public
	 */
	setLine1 (value) {
		this._data.line1 = value;
	}

	/**
	 *
	 * @method hasValidLine1
	 * @public
	 */
	hasValidLine1 () {
		try {
			let v = this._data.line1;
			if (v && this._is('String', v)) {
				return true;
			}
		} catch (err) {
			return false;
		}

		return false;
	}

	/**
	 *
	 * @method getPhone
	 * @returns {String}
	 * @public
	 */
	getPhone () {
		return this._data.phone;
	}

	/**
	 *
	 * @method setPhone
	 * @param {String} value
	 * @public
	 */
	setPhone (value) {
		this._data.phone = value;
	}

	/**
	 *
	 * @method hasValidPhone
	 * @public
	 */
	hasValidPhone () {
		try {
			let v = this._data.phone;
			if (v && this._is('String', v)) {
				return true;
			}
		} catch (err) {
			return false;
		}

		return false;
	}

	/**
	 *
	 * @method getPostalCode
	 * @returns {String}
	 * @public
	 */
	getPostalCode () {
		return this._data.postalCode;
	}

	/**
	 *
	 * @method setPostalCode
	 * @param {String} value
	 * @public
	 */
	setPostalCode (value) {
		this._data.postalCode = value;
	}

	/**
	 *
	 * @method hasValidPostalCode
	 * @public
	 */
	hasValidPostalCode () {
		try {
			let v = this._data.postalCode;
			if (v && this._is('String', v)) {
				return true;
			}
		} catch (err) {
			return false;
		}

		return false;
	}

	/**
	 *
	 * @method getStreetName
	 * @returns {String}
	 * @public
	 */
	getStreetName () {
		return this._data.streetName;
	}

	/**
	 *
	 * @method setStreetName
	 * @param {String} value
	 * @public
	 */
	setStreetName (value) {
		this._data.streetName = value;
	}

	/**
	 *
	 * @method hasValidStreetName
	 * @public
	 */
	hasValidStreetName () {
		try {
			let v = this._data.streetName;
			if (v && this._is('String', v)) {
				return true;
			}
		} catch (err) {
			return false;
		}

		return false;
	}

	/**
	 *
	 * @method getStreetNumber
	 * @returns {String}
	 * @public
	 */
	getStreetNumber () {
		return this._data.streetNumber;
	}

	/**
	 *
	 * @method setStreetNumber
	 * @param {String} value
	 * @public
	 */
	setStreetNumber (value) {
		this._data.streetNumber = value;
	}

	/**
	 *
	 * @method hasValidStreetNumber
	 * @public
	 */
	hasValidStreetNumber () {
		try {
			let v = this._data.streetNumber;
			if (v && this._is('String', v)) {
				return true;
			}
		} catch (err) {
			return false;
		}

		return false;
	}

	/**
	 *
	 * @method getTitle
	 * @returns {String}
	 * @public
	 */
	getTitle () {
		return this._data.title;
	}

	/**
	 *
	 * @method setTitle
	 * @param {String} value
	 * @public
	 */
	setTitle (value) {
		this._data.title = value;
	}

	/**
	 *
	 * @method hasValidTitle
	 * @public
	 */
	hasValidTitle () {
		try {
			let v = this._data.title;
			if (v && this._is('String', v)) {
				return true;
			}
		} catch (err) {
			return false;
		}

		return false;
	}

	/**
	 *
	 * @method getTitleCode
	 * @returns {String}
	 * @public
	 */
	getTitleCode () {
		return this._data.titleCode;
	}

	/**
	 *
	 * @method setTitleCode
	 * @param {String} value
	 * @public
	 */
	setTitleCode (value) {
		this._data.titleCode = value;
	}

	/**
	 *
	 * @method hasValidTitleCode
	 * @public
	 */
	hasValidTitleCode () {
		try {
			let v = this._data.titleCode;
			if (v && this._is('String', v)) {
				return true;
			}
		} catch (err) {
			return false;
		}

		return false;
	}

	/**
	 *
	 * @method getTown
	 * @returns {String}
	 * @public
	 */
	getTown () {
		return this._data.town;
	}

	/**
	 *
	 * @method setTown
	 * @param {String} value
	 * @public
	 */
	setTown (value) {
		this._data.town = value;
	}

	/**
	 *
	 * @method hasValidTown
	 * @public
	 */
	hasValidTown () {
		try {
			let v = this._data.town;
			if (v && this._is('String', v)) {
				return true;
			}
		} catch (err) {
			return false;
		}

		return false;
	}

	/**
	 *
	 * @method getList
	 * @returns {Array}
	 * @public
	 */
	getList () {
		return this._data.list;
	}

	/**
	 *
	 * @method setList
	 * @param {Array} value
	 * @public
	 */
	setList (value) {
		this._data.list = value;
	}

	/**
	 *
	 * @method hasValidList
	 * @public
	 */
	hasValidList () {
		try {
			let v = this._data.list;
			if (v && this._is('Array', v)) {
				return true;
			}
		} catch (err) {
			return false;
		}

		return false;
	}

	/**
	 *
	 * @method getItems
	 * @returns {Array}
	 * @public
	 */
	getItems () {
		return this._data.items;
	}

	/**
	 *
	 * @method setItems
	 * @param {Array} value
	 * @public
	 */
	setItems (value) {
		this._data.items = value;
	}

	/**
	 *
	 * @method hasValidItems
	 * @public
	 */
	hasValidItems () {
		try {
			let v = this._data.items;
			if (v && this._is('Array', v)) {
				return true;
			}
		} catch (err) {
			return false;
		}

		return false;
	}

}