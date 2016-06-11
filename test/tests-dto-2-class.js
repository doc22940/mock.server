
var assert = require('assert'),
	request = require('request'),
	Utils = require('../lib/Utils'),
	utils = new Utils();

function _fetch (opt) {
	request({
		uri: opt.url,
		method: opt.method || 'GET',
		form: opt.data || {}
	}, function(error, res, data) {
		if (error) {
			opt.error.call(this, data);
		} else {
			opt.success.call(this, data);
		}
	});
}

function _url (baseUrl, options) {

	var query = [];

	utils.forIn(options, function (key, value) {
		query.push(key + '=' + encodeURIComponent(value));
	});

	return baseUrl + '/service/class-dto?' + query.join('&');
}

module.exports = function(serverOptions, _getFile) {

	var pathExpected = './test/expected/dto-2-class',
		pathDTO = './test/tmp/swagger-import/_DTO/',
		baseUrl = serverOptions.urlBase;

	it('ES5 AddressWsDTO Class', function (done) {
		_fetch({
			url: _url(baseUrl, {
				es: 'es5',
				setter: 'true',
				getter: 'true',
				validator: 'true',
				path: pathDTO + 'AddressWsDTO.json',
				name: 'AddressWsDTO'
			}),
			success: function (data) {
				var expected = _getFile(pathExpected + '/01.js');
				assert.equal(data, expected);
				done();
			}
		});
	});

	it('ES5 ComplexDTO Class', function (done) {
		_fetch({
			url: _url(baseUrl, {
				es: 'es5',
				setter: 'true',
				getter: 'true',
				validator: 'true',
				path: pathDTO + 'ComplexDTO.json',
				name: 'ComplexDTO'
			}),
			success: function (data) {
				var expected = _getFile(pathExpected + '/01-1.js');
				assert.equal(data, expected);
				done();
			}
		});
	});

	it('ES5 AddressWsDTO Class without validators', function (done) {
		_fetch({
			url: _url(baseUrl, {
				es: 'es5',
				setter: 'true',
				getter: 'true',
				validator: 'false',
				path: pathDTO + 'AddressWsDTO.json',
				name: 'AddressWsDTO'
			}),
			success: function (data) {
				var expected = _getFile(pathExpected + '/02.js');
				assert.equal(data, expected);
				done();
			}
		});
	});

	it('ES5 AddressWsDTO Class without setter', function (done) {
		_fetch({
			url: _url(baseUrl, {
				es: 'es5',
				setter: 'false',
				getter: 'true',
				validator: 'true',
				path: pathDTO + 'AddressWsDTO.json',
				name: 'AddressWsDTO'
			}),
			success: function (data) {
				var expected = _getFile(pathExpected + '/03.js');
				assert.equal(data, expected);
				done();
			}
		});
	});

	it('ES5 AddressWsDTO Class without getter', function (done) {
		_fetch({
			url: _url(baseUrl, {
				es: 'es5',
				setter: 'true',
				getter: 'false',
				validator: 'true',
				path: pathDTO + 'AddressWsDTO.json',
				name: 'AddressWsDTO'
			}),
			success: function (data) {
				var expected = _getFile(pathExpected + '/04.js');
				assert.equal(data, expected);
				done();
			}
		});
	});

	it('ES5 AddressWsDTO Class just getter', function (done) {
		_fetch({
			url: _url(baseUrl, {
				es: 'es5',
				setter: 'false',
				getter: 'true',
				validator: 'false',
				path: pathDTO + 'AddressWsDTO.json',
				name: 'AddressWsDTO'
			}),
			success: function (data) {
				var expected = _getFile(pathExpected + '/05.js');
				assert.equal(data, expected);
				done();
			}
		});
	});

	it('ES6 AddressWsDTO Class', function (done) {
		_fetch({
			url: _url(baseUrl, {
				es: 'es6',
				setter: 'true',
				getter: 'true',
				validator: 'true',
				path: pathDTO + 'AddressWsDTO.json',
				name: 'AddressWsDTO'
			}),
			success: function (data) {
				var expected = _getFile(pathExpected + '/06.js');
				assert.equal(data, expected);
				done();
			}
		});
	});

	it('ES5 AddressWsDTO test getter, setter and validators', function () {
		var AddressWsDTO = require('.' + pathExpected + '/07.js'),
			data = {},
			address;

		data.email = 'somemail@mail.com';
		data.lastName = 'lastName';

		address = new AddressWsDTO(data);
		assert.equal(address.getEmail(), data.email);
		assert.equal(address.hasValidEmail(), true);
		assert.equal(address.hasValidFirstName(), false);
		assert.equal(address.hasValidLastName(), true);
		assert.equal(address.getLastName(), data.lastName);
		address.setLastName('lastName2');
		assert.equal(address.getLastName(), 'lastName2');
	});

	//
	//	REMOVED BECAUSE OF node 0.12
	//
	//it('ES6 AddressWsDTO test getter, setter and validators', function () {
	//	var AddressWsDTO = require('.' + pathExpected + '/08.js'),
	//		data = {},
	//		address;
	//
	//	data.email = 'somemail@mail.com';
	//	data.lastName = 'lastName';
	//
	//	address = new AddressWsDTO(data);
	//	assert.equal(address.getEmail(), data.email);
	//	assert.equal(address.hasValidEmail(), true);
	//	assert.equal(address.hasValidFirstName(), false);
	//	assert.equal(address.hasValidLastName(), true);
	//	assert.equal(address.getLastName(), data.lastName);
	//	address.setLastName('lastName2');
	//	assert.equal(address.getLastName(), 'lastName2');
	//});


};