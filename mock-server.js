
'use strict';

var AppControllerSingleton = require('./controller/AppController');

module.exports = function (options) {

	AppControllerSingleton.getInstance(options);

	var UiController = require('./controller/UiController');
	new UiController();

	var SchemaController = require('./controller/SchemaController');
	new SchemaController();

	var SwaggerImportController = require('./controller/SwaggerImportController');
	new SwaggerImportController();

	var DTOController = require('./controller/DTOController');
	new DTOController();

	var ResponseController = require('./controller/ResponseController');
	new ResponseController();

	var PreferencesController = require('./controller/PreferencesController');
	new PreferencesController();

	var ValidatorController = require('./controller/ValidatorController');
	new ValidatorController();

	var MockController = require('./controller/MockController');
	new MockController();

};

