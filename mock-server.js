
'use strict';

var AppControllerSingleton = require('./lib/controller/AppController');

module.exports = function (options) {

	AppControllerSingleton.getInstance(options);

	var UiController = require('./lib/controller/UiController');
	new UiController();

	var SchemaController = require('./lib/controller/SchemaController');
	new SchemaController();

	var SwaggerImportController = require('./lib/controller/SwaggerImportController');
	new SwaggerImportController();

	var DTOController = require('./lib/controller/DTOController');
	new DTOController();

	var ResponseController = require('./lib/controller/ResponseController');
	new ResponseController();

	var PreferencesController = require('./lib/controller/PreferencesController');
	new PreferencesController();

	var ValidatorController = require('./lib/controller/ValidatorController');
	new ValidatorController();

	var MockController = require('./lib/controller/MockController');
	new MockController();

};
