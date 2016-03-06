# node-mock-server

> File based Node API mock server

![node-mock-server-ui.png](https://bitbucket.org/repo/aXBqRL/images/4219993214-node-mock-server-ui.png)

## Features
- Node.js and file based
- API documentation UI
- Mock functions
- Faker included
- Multiple expected responses
- Error cases
- Swagger import
- Mock response validation

## Getting Started
This plugin requires Node `~0.12.7`

```shell
brew install node
```

```shell
npm install node-mock-server --save-dev
```

```shell
node app.js
```

## The "app.js" file

### Overview
In your project's root, add a file named for example `app.js`.

```js
var mockServer = require('./node_modules/node-mock-server/mock-server.js');
mockServer(options);
```


### Options

#### options.restPath
Type: `String`
Default value: `'./rest'`

A string value that is used to define the path to the rest API folder.

#### options.title
Type: `String`
Default value: `Api mock server`

A string value that is used to define the title of the specification page.

#### options.version
Type: `Number`
Default value: `1`

A number value that is used to define the API version.

#### options.urlBase
Type: `String`
Default value: `http://localhost:3001`

A string value that is used to define the API url.

#### options.urlPath
Type: `String`
Default value: `/rest/v1`

A string value that is used to define the path under which the API will be available.

#### options.port
Type: `Number`
Default value: `3001`

A number value that is used to define the port.

#### options.funcPath
Type: `String|Array`
Optional

A string or array that is used to define where the functions are located.

#### options.contentType
Type: `String`
Default value: `application/json`

A string that is used to define the header "Content-Type".


#### options.accessControlExposeHeaders
Type: `String`
Default value: `X-Total-Count`

A string that is used to define the header "Access-Control-Expose-Headers".

#### options.accessControlAllowOrigin
Type: `String`
Default value: `*`

A string that is used to define the header "Access-Control-Allow-Origin".

#### options.accessControlAllowMethods
Type: `String`
Default value: `GET, POST, PUT, OPTIONS, DELETE, PATCH, HEAD`

A string that is used to define the header "Access-Control-Allow-Methods".


#### options.accessControlAllowHeaders
Type: `String`
Default value: `origin, x-requested-with, content-type`

A string that is used to define the header "Access-Control-Allow-Headers".


#### options.swaggerImport
Type: `Object`
Optional

A object that is used to define the swagger import.

#### options.swaggerImport.protocol
Type: `String`
Default value: `http`

A string that is used to define the protocol for the swagger import curl.

#### options.swaggerImport.authUser
Type: `String`
Optional

A string that is used to define the basic auth user for the swagger import curl.


#### options.swaggerImport.authPass
Type: `String`
Optional

A string that is used to define the basic auth password for the swagger import curl.


#### options.swaggerImport.host
Type: `String`
Required

A string that is used to define the host for the swagger import curl.


#### options.swaggerImport.port
Type: `String`
Default value: `80`

A string that is used to define the port for the swagger import curl.


#### options.swaggerImport.path
Type: `String`
Default value: ``

A string that is used to define the path for the swagger import curl.

#### options.swaggerImport.dest
Type: `String`
Required

A string that is used to define the destination path for the swagger import.

#### options.swaggerImport.replacePathsStr
Type: `String`
Default value: ``

A string that is used to define the part of the swagger imported methods path which should be removed.


#### options.swaggerImport.createErrorFile
Type: `Boolean`
Default value: `true`

A boolean that is used to decide to create an expected response error file or not.

#### options.swaggerImport.createEmptyFile
Type: `Boolean`
Default value: `true`

A boolean that is used to decide to create an expected response empty file or not.

#### options.swaggerImport.overwriteExistingDescriptions
Type: `Boolean`
Default value: `true`

A boolean that is used to decide to replace an old description with the new (imported) description or not.

#### options.swaggerImport.maxRefDeep
Type: `Number`
Default value: `1`

A number that is used to define the deep of recursive DTO replacement.


### Usage Examples

#### Default Options

```js
var mockServer = require('./node_modules/node-mock-server/mock-server.js');
mockServer();
```

#### Custom Options

```js
var mockServer = require('./node_modules/node-mock-server/mock-server.js');
mockServer({
	restPath: './mock/rest',
    title: 'Api mock server',
    version: 2,
    urlBase: 'http://localhost:3003',
    urlPath: '/rest/v2',
    port: 3003,
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
    	overwriteExistingDescriptions: true
    }
});
```

### Folder structure

- example_rest_folder

|- group
|--- #path
|--- #path#{param}
|----- method (GET, POST, DELETE ...)
|------- mock
|--------- success.json
|--------- error.json
|--------- error-401.json
|------- desc.json
|------- request_schema.json
|------- response_schema.json

## Functions in mock data
- [Add function](https://github.com/smollweide/node-mock-server/blob/develop/func/price.js)
- [Add function folder to option](https://github.com/smollweide/node-mock-server/blob/develop/app.js#L8)
- [Use function in mock data](https://github.com/smollweide/node-mock-server/blob/develop/example_rest_folder/products/%23search/GET/mock/success.json#L3)

## Use Faker in mock data
- [Faker](https://www.npmjs.com/package/faker)
- [Use Faker in mock data](https://github.com/smollweide/node-mock-server/blob/develop/example_rest_folder/products/%23search/GET/mock/success.json)

## Expected response
- use the ui to configure the expected response for each call
- use the get param "_expected"
- use the request header "_expected"

## Mock response validation
- In case of you using params (form or get) in mock data, you can simulate them by adding an [".request_data.json"](https://github.com/smollweide/node-mock-server/blob/feature/ValidateResponseSchema/example_rest_folder/products/%23%7BproductCode%7D/GET/mock/.request_data.json) file.

## Release History
- 0.1.0 Specification UI
- 0.2.0 Mock Server
- 0.2.3 UI with group navigation
- 0.3.0 Populate functions in mock data and add Faker
- 0.4.0 Allows explicit error messages and their status.
- 0.5.0 Swagger import
- 0.6.0 Mock response validation
- 0.6.3 Prettify logs and bug fixes