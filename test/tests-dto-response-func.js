
var assert = require('assert');

module.exports = function(serverOptions, _getFile) {

	var pathFunc = serverOptions.swaggerImport.responseFuncPath,
		pathRest = serverOptions.swaggerImport.dest,
		pathExpSwagger = './test/expected/dto-response-func';

	// ResponseFuncTestDTO
	it('DTO Response Func (ResponseFuncTestDTO) should be written!', function () {
		var data = _getFile(pathFunc + '/ResponseFuncTestDTO.js'),
			expected = _getFile(pathExpSwagger + '/ResponseFuncTestDTO.js');
		assert.equal(data, expected);
	});

	// RuleWsDTO
	it('DTO Rule (RuleWsDTO) should be written!', function () {
		var data = _getFile(pathFunc + '/RuleWsDTO.js'),
			expected = _getFile(pathExpSwagger + '/RuleWsDTO.js');
		assert.equal(data, expected);
	});

	// success-faker
	it('success-faker file should be written!', function () {
		var data = _getFile(pathRest + '/addresses/#/GET/mock/success-faker.json'),
			expected = _getFile(pathExpSwagger + '/success-faker.json');
		assert.equal(data, expected);
	});

};