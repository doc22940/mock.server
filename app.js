
var mockServer = require('./mock-server.js'),
	dest = __dirname + '/example_rest_folder',
	replacePathsStr = '/v2/{baseSiteId}',
	responseFuncPath = __dirname + '/func-imported';

//dest = __dirname + '/test/tmp/swagger-import';
//replacePathsStr = '/v2/{id}';

mockServer({
	restPath: dest,
	dirName: __dirname,
	funcPath: [
		__dirname + '/func',
		__dirname + '/func2',
		responseFuncPath
	],
	headers: {
		'Global-Custom-Header': 'Global-Custom-Header'
	},
	swaggerImport: {
		protocol: 'http',
		authUser: undefined,
		authPass: undefined,
		host: 'localhost',
		port: 3001,
		path: '/src/swagger/swagger-api-docs.json',
		dest: dest,
		replacePathsStr: replacePathsStr,
		createErrorFile: true,
		createEmptyFile: true,
		overwriteExistingDescriptions: true,
		responseFuncPath: responseFuncPath
	}
});