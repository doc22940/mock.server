var ignoreGeneral = require('./ignore-general');
var ignoreInRestRoot = ignoreGeneral.concat([
	'_DTO',
	'_collections',
	'_fallbacks',
	'preferences.json',
	'.swagger_import.json',
	'.validation.json',
]);

module.exports = ignoreInRestRoot;
