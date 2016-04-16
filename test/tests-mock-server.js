
var assert = require('assert'),
	request = require('request');

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

module.exports = function(serverOptions, _getFile) {

	var pathExpected = './test/expected/mock-server',
		baseUrl = serverOptions.urlBase + serverOptions.urlPath;

	it('GET /products/search', function (done) {
		_fetch({
			url: baseUrl + '/products/search?_expected=success',
			success: function (data) {
				var expected = _getFile(pathExpected + '/01.json');
				assert.equal(data, expected);
				done();
			}
		});
	});

	it('GET /products', function (done) {
		_fetch({
			url: baseUrl + '/products?_expected=success',
			success: function (data) {
				var expected = _getFile(pathExpected + '/01.json');
				assert.equal(data, expected);
				done();
			}
		});
	});

	it('GET /products/{productCode}', function (done) {
		_fetch({
			url: baseUrl + '/products/31221?_expected=success-default',
			success: function (data) {
				var expected = _getFile(pathExpected + '/02.json');
				assert.equal(data, expected);
				done();
			}
		});
	});

	it('GET /products/{productCode} - with request data', function (done) {
		_fetch({
			url: baseUrl + '/products/31221?_expected=request-data&currentPage=12',
			success: function (data) {
				var expected = _getFile(pathExpected + '/02-2.json');
				assert.equal(data, expected);
				done();
			}
		});
	});

	it('GET /products/{productCode} - with functions', function (done) {
		_fetch({
			url: baseUrl + '/products/31221?_expected=func',
			success: function (data) {
				data = JSON.parse(data);
				assert.equal(typeof data, 'object');
				assert.equal(typeof data.image, 'object');
				assert.equal(typeof data.image.url, 'string');
				assert.equal(typeof data.image.alt, 'string');
				assert.equal(typeof data.highlight, 'boolean');
				assert.equal(typeof data.quantity, 'number');
				done();
			}
		});
	});

	it('GET /products/{productCode} - with faker', function (done) {
		_fetch({
			url: baseUrl + '/products/31221?_expected=faker',
			success: function (data) {
				data = JSON.parse(data);
				assert.equal(typeof data, 'object');
				assert.equal(typeof data.price, 'object');
				assert.equal(typeof data.price.currency, 'string');
				assert.equal(data.cards instanceof Array, true);
				assert.equal(typeof data.cards[0].name, 'string');
				done();
			}
		});
	});

	it('GET /search/users/{userId}/products/{productCode}/available - with empty dynamic path param', function (done) {
		_fetch({
			url: baseUrl + '/search/users//products/1/available?_expected=success',
			success: function (data) {
				data = JSON.parse(data);
				assert.equal(typeof data, 'object');
				assert.equal(data.errors.length > 0, true);
				assert.equal(data.errors[0].type, 'InvalidPathError');
				done();
			}
		});
	});

	it('GET /search/users/{userId}/products/{productCode}/available - with empty dynamic path param', function (done) {
		_fetch({
			url: baseUrl + '/search/users/1/products//available?_expected=success',
			success: function (data) {
				data = JSON.parse(data);
				assert.equal(typeof data, 'object');
				assert.equal(data.errors.length > 0, true);
				assert.equal(data.errors[0].type, 'InvalidPathError');
				done();
			}
		});
	});

	it('GET /products/{productCode} - with placeholder dynamic path param', function (done) {
		_fetch({
			url: baseUrl + '/products/{productCode}?_expected=success',
			success: function (data) {
				data = JSON.parse(data);
				assert.equal(typeof data, 'object');
				assert.equal(data.errors.length > 0, true);
				assert.equal(data.errors[0].type, 'InvalidPathError');
				done();
			}
		});
	});

	it('GET /search/users/{userId}/products/{productCode}/available - with placeholder dynamic path param', function (done) {
		_fetch({
			url: baseUrl + '/search/users/1/products/{productCode}/available?_expected=success',
			success: function (data) {
				data = JSON.parse(data);
				assert.equal(typeof data, 'object');
				assert.equal(data.errors.length > 0, true);
				assert.equal(data.errors[0].type, 'InvalidPathError');
				done();
			}
		});
	});

	it('GET /search/users/{userId}/products/{productCode}/available - with placeholder dynamic path param', function (done) {
		_fetch({
			url: baseUrl + '/search/users/{userId}/products/1/available?_expected=success',
			success: function (data) {
				data = JSON.parse(data);
				assert.equal(typeof data, 'object');
				assert.equal(data.errors.length > 0, true);
				assert.equal(data.errors[0].type, 'InvalidPathError');
				done();
			}
		});
	});

	it('POST /products/{productCode}', function (done) {
		_fetch({
			url: baseUrl + '/products/31221?_expected=success',
			method: 'POST',
			success: function (data) {
				var expected = _getFile(pathExpected + '/03.json');
				assert.equal(data, expected);
				done();
			}
		});
	});

	it('GET /search/search.iPhone.result.json', function (done) {
		_fetch({
			url: baseUrl + '/search/search.iPhone.result.json?_expected=success',
			success: function (data) {
				var expected = _getFile(pathExpected + '/04.json');
				assert.equal(data, expected);
				done();
			}
		});
	});

	it('GET /search/search.iPhone.result.json - error response', function (done) {
		_fetch({
			url: baseUrl + '/search/search.iPhone.result.json?_expected=error',
			success: function (data) {
				var expected = _getFile(pathExpected + '/05.json');
				assert.equal(data, expected);
				done();
			}
		});
	});

	it('GET /search/search.iPhone.result.json - error 401 response', function (done) {
		_fetch({
			url: baseUrl + '/search/search.iPhone.result.json?_expected=error-401',
			success: function (data) {
				var expected = _getFile(pathExpected + '/06.json');
				assert.equal(data, expected);
				done();
			}
		});
	});

	it('GET /products/{productCode} with response files - case default', function (done) {
		_fetch({
			url: baseUrl + '/products/31221?_expected=success',
			success: function (data) {
				var expected = _getFile(pathExpected + '/07.json');
				assert.equal(data, expected);
				done();
			}
		});
	});

	it('GET /products/{productCode} with response files - case productCode = 1', function (done) {
		_fetch({
			url: baseUrl + '/products/1?_expected=success',
			success: function (data) {
				var expected = _getFile(pathExpected + '/07-1.json');
				assert.equal(data, expected);
				done();
			}
		});
	});

	it('GET /products/{productCode} with response files - case productCode = 2', function (done) {
		_fetch({
			url: baseUrl + '/products/2?_expected=success',
			success: function (data) {
				var expected = _getFile(pathExpected + '/07-2.json');
				assert.equal(data, expected);
				done();
			}
		});
	});


};