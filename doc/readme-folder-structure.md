
# Adding new ReST Resources
The node-mock-server supports importing swagger descriptions for an API. However, you can create mock resources manually, too. 


## Folder structure
The node-mock-server expects you to follow the path conventions below for the content of your `restPath` folder.

```
|- group
|--- #
|--- #path
|--- #path#{param}
|----- method (GET, POST, DELETE ...)
|------- mock
|--------- success.json
|--------- success.headers.json
|--------- error.json
|--------- error-401.json
|------- desc.json
|------- request_schema.json
|------- response_schema.json
```
See [/demo/rest](https://github.com/smollweide/node-mock-server/tree/master/demo/rest) for an executable example. 

The top level folder becomes the url path segment immediately after your API `urlPath`: if your `urlPath` is _/rest/v2_, then you would get a _/rest/v2/group_ resource in your mock API for the folder structure above.

### Path folders
The _#_ represents a slash in the url path of your response. In other words, the _#_ folder above describes the responses to requests for _/rest/v2/group/_ (trailing slash) whereas the _#path_ folder will become the _/rest/v2/group/path_ resource in your API.

If you want to use dynamic path segments, you can enclose them in curly brackets, as shown above for the _#path#{param}_ folder. The node-mock-server looks for a success response called success-1 if the requested url is /path/1, success-2 is for /path/2 etc., and success-default is for all other cases. For examples how the actual value can be used inside responses, look at the success files for _products_ [in the demo](https://github.com/smollweide/node-mock-server/blob/master/demo/rest/products/%23%7BproductCode%7D/GET/mock).

### Method folders
A path folder with _#_ must contain one or more method folder, e.g. _GET_ or _POST_ which require to contain a _mock_ directory in turn - that directory will later contain the actual API responses.

The file _desc.json_ is optional and can be used to describe the response to a method call on a resource in more detail. Consider the sample _desc.json_ below.
```
{
	"desc": "Returns a list of products",
	"security": [],
	"protected": false,
	"status": "open",
	"request": {
		"query": {
			"parameters": [
				{
					"name": "query",
					"required": false,
					"type": "string",
					"desc": "Search query"
				}
			]
		}
	},
	"response": {
		"statusCode": 200,
		"schema": {
			"type": "application/json"
		}
	}
}
```
The example above provides a descriptive string in the `desc` attribute and specifies expected requests and possible responses.

The files _request_schema.json_ and _response_schema.json_ are optional and may contain json schema definitions for your requests and responses which allow for validation.

## Using the node-mock-server UI

Once you have defined a resource path with a method folder containing a mock directory, you can continue to work with the new resource in the UI at http://localhost:3003 (or at the port you have defined via options). Hit F5 in the UI to see new resources after adding them in the file system.

Click the GET button which appears after the /foo resource. A popup appears that shows the possible responses and allows to add new responses. The node-mock-server can respond through a middleware, so *middleware* is always available.

Hit *+Add* to add a new response and call it `success`. Your favorite JSON editor is fired up where you can enter the response.

After storing the response, you need to select the radiobutton in front of your new *success* response. A file _response.txt_ will be created alongside your possible responses which stores your decision.

You can also add an 'error' response and use the radiobutton to define whether the resource should respond with a success or error response. For an error response the default HTTP status code is 500, but you can specify a different status code by suffixing the name of your error response with the appropriate status code, like error-401.
