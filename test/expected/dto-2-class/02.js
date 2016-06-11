
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
	 * @method setCountry
	 * @param {Object|Array} value
	 * @public
	 */
	setCountry: function (value) {
		this._data.country = value;
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
	 * @method setCountryIsocode
	 * @param {String} value
	 * @public
	 */
	setCountryIsocode: function (value) {
		this._data.countryIsocode = value;
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
	 * @method setCountry2
	 * @param {Object|Array} value
	 * @public
	 */
	setCountry2: function (value) {
		this._data.country2 = value;
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
	 * @method setEmail
	 * @param {String} value
	 * @public
	 */
	setEmail: function (value) {
		this._data.email = value;
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
	 * @method setFirstName
	 * @param {String} value
	 * @public
	 */
	setFirstName: function (value) {
		this._data.firstName = value;
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
	 * @method setId
	 * @param {String} value
	 * @public
	 */
	setId: function (value) {
		this._data.id = value;
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
	 * @method setLastName
	 * @param {String} value
	 * @public
	 */
	setLastName: function (value) {
		this._data.lastName = value;
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
	 * @method setLine1
	 * @param {String} value
	 * @public
	 */
	setLine1: function (value) {
		this._data.line1 = value;
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
	 * @method setPhone
	 * @param {String} value
	 * @public
	 */
	setPhone: function (value) {
		this._data.phone = value;
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
	 * @method setPostalCode
	 * @param {String} value
	 * @public
	 */
	setPostalCode: function (value) {
		this._data.postalCode = value;
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
	 * @method setStreetName
	 * @param {String} value
	 * @public
	 */
	setStreetName: function (value) {
		this._data.streetName = value;
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
	 * @method setStreetNumber
	 * @param {String} value
	 * @public
	 */
	setStreetNumber: function (value) {
		this._data.streetNumber = value;
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
	 * @method setTitle
	 * @param {String} value
	 * @public
	 */
	setTitle: function (value) {
		this._data.title = value;
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
	 * @method setTitleCode
	 * @param {String} value
	 * @public
	 */
	setTitleCode: function (value) {
		this._data.titleCode = value;
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
	 * @method setTown
	 * @param {String} value
	 * @public
	 */
	setTown: function (value) {
		this._data.town = value;
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
	}

};