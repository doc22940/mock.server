
var mockServer = require('./../mock-server.js');
var dest = __dirname + '/rest';
var replacePathsStr = '/v2/{baseSiteId}';
var responseFuncPath = __dirname + '/func-imported';

// http://petstore.swagger.io/v2/swagger.json

mockServer({
	restPath: dest,
	dirName: __dirname,
	funcPath: [
		__dirname + '/func',
		__dirname + '/func2',
		responseFuncPath,
	],
	headers: {
		'Global-Custom-Header': 'Global-Custom-Header',
	},
	customDTOToClassTemplate: __dirname + '/templates/dto_es6flow.ejs',
	swaggerImport: {
		protocol: 'http',
		authUser: undefined,
		authPass: undefined,
		host: 'petstore.swagger.io',
		port: 80,
		path: '/v2/swagger.json',
		dest: dest,
		replacePathsStr: replacePathsStr,
		createErrorFile: true,
		createEmptyFile: true,
		overwriteExistingDescriptions: true,
		responseFuncPath: responseFuncPath,
	},
});
