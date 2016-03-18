
var mockServer = require('./mock-server.js'),
	dest = './example_rest_folder';

dest = './test/tmp/swagger-import';

mockServer({
	restPath: dest,
	funcPath: [
		__dirname + '/func',
		__dirname + '/func2'
	],
	swaggerImport: {
		protocol: 'http',
		authUser: undefined,
		authPass: undefined,
		host: 'localhost',
		port: 3001,
		path: '/src/swagger/swagger-demo-docs.json',
		dest: dest,
		replacePathsStr: '/v2/{baseSiteId}',
		createErrorFile: true,
		createEmptyFile: true,
		overwriteExistingDescriptions: true,
		maxRefDeep: 1
	}
});