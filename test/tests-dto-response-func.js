
var assert = require('assert');

module.exports = function(serverOptions, _getFile) {

	var pathFunc = serverOptions.swaggerImport.responseFuncPath,
		pathExpSwagger = './test/expected/dto-response-func';

	// AddressResponseWsDTO
	it('DTO Response Func (ResponseFuncTestDTO) should be written!', function () {
		var data = _getFile(pathFunc + '/ResponseFuncTestDTO.js'),
			expected = _getFile(pathExpSwagger + '/ResponseFuncTestDTO.js');
		assert.equal(data, expected);
	});

};