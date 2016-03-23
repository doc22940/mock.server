
'use strict';

var express = require('express'),
	app = express(),
	fs = require('fs'),
	bodyParser = require('body-parser'),
	Utils = require('./lib/Utils'),
	_utils = new Utils(),
	util = require('util'),
	extend = util._extend,
	ejs = require('ejs'),
	Ui = require('./lib/ui'),
	getResponseData = require('./lib/getResponseData'),
	getFunc = require('./lib/getFunc'),
	getPreferences = require('./lib/getPreferences'),
	SwaggerImport = require('./lib/SwaggerImport'),
	swaggerLog = require('./lib/SwaggerLog'),
	DTOToClassConverter = require('./lib/DTOToClassConverter'),
	GetResponse = require('./lib/GetResponse'),
	ValidatorResponse = require('./lib/ValidatorResponse'),
	ValidatorResponses = require('./lib/ValidatorResponses'),
	validatorLog = require('./lib/ValidatorLog'),
	findFolder = require('./lib/findFolder'),
	AppControllerSingleton = require('./controller/AppController'),
	UiController,
	MockController,
	SchemaController,
	SwaggerImportController,
	DTOController,
	ResponseController,
	PreferencesController,
	ValidatorController;

module.exports = function (options) {

	AppControllerSingleton.getInstance(options);

	UiController = require('./controller/UiController');
	new UiController();

	SchemaController = require('./controller/SchemaController');
	new SchemaController();

	SwaggerImportController = require('./controller/SwaggerImportController');
	new SwaggerImportController();

	DTOController = require('./controller/DTOController');
	new DTOController();

	ResponseController = require('./controller/ResponseController');
	new ResponseController();

	PreferencesController = require('./controller/PreferencesController');
	new PreferencesController();

	ValidatorController = require('./controller/ValidatorController');
	new ValidatorController();

	MockController = require('./controller/MockController');
	new MockController();

};

