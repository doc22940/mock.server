
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
	 * @method getFirstName
	 * @returns {String}
	 * @public
	 */
	getFirstName: function () {
		return this._data.firstName;
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
	 * @method getLastName
	 * @returns {String}
	 * @public
	 */
	getLastName: function () {
		return this._data.lastName;
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
	 * @method getPhone
	 * @returns {String}
	 * @public
	 */
	getPhone: function () {
		return this._data.phone;
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
	 * @method getStreetName
	 * @returns {String}
	 * @public
	 */
	getStreetName: function () {
		return this._data.streetName;
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
	 * @method getTitle
	 * @returns {String}
	 * @public
	 */
	getTitle: function () {
		return this._data.title;
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
	 * @method getTown
	 * @returns {String}
	 * @public
	 */
	getTown: function () {
		return this._data.town;
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
	 * @method getItems
	 * @returns {Array}
	 * @public
	 */
	getItems: function () {
		return this._data.items;
	}

};