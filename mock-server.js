'use strict';

/* eslint global-require: 0 */

var AppControllerSingleton = require('./lib/controller/AppController');

module.exports = function (options) {

	AppControllerSingleton.getInstance(options);

	var UiController = require('./lib/controller/UiController');
	var SchemaController = require('./lib/controller/SchemaController');
	var SwaggerImportController = require('./lib/controller/SwaggerImportController');
	var DTOController = require('./lib/controller/DTOController');
	var ResponseController = require('./lib/controller/ResponseController');
	var PreferencesController = require('./lib/controller/PreferencesController');
	var ValidatorController = require('./lib/controller/ValidatorController');
	var MockController = require('./lib/controller/MockController');

	return {
		uiController: new UiController(),
		schemaController: new SchemaController(),
		swaggerImportController: new SwaggerImportController(),
		dtoController: new DTOController(),
		ResponseController: new ResponseController(),
		preferencesController: new PreferencesController(),
		validatorController: new ValidatorController(),
		mockController: new MockController(),
	};
};
