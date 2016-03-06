
var assert = require('assert');

module.exports = function(serverOptions, _getFile) {

	var pathAddresses = serverOptions.restPath + '/products/#{productCode}';

	it('find attributes which are not defined in schema', function () {
		var data = _getFile(pathAddresses + '/GET/mock/.faker_validation');
		assert.equal(JSON.parse(data).counter > 0, true);
	});

	it('find invalid value', function () {
		var data = _getFile(pathAddresses + '/GET/mock/.request-data_validation');
		assert.equal(JSON.parse(data).counter === 1, true);
	});

	it('validation successful', function () {
		var data = _getFile(pathAddresses + '/GET/mock/.func_validation');
		assert.equal(JSON.parse(data).counter === 0, true);
	});

};