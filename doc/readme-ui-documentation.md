# Using the node-mock-server UI

The mock server UI is available at _http://localhost:3003_ (or at the port you have defined via options).

If the service you want to mock provides a Swagger definition and you have provided a swagger definition, you may perform an import via the small triangle button in the head of the UI page.
 
 In the same location you also find general preferences such as a response delay and you can trigger a validation of all responses.

In addition to Swagger imports, you may also [define a resource path with a ReST method folder containing a mock directory](https://github.com/smollweide/node-mock-server/blob/master/doc/readme-folder-structure.md) manually by creating the appropriate folders in the file system. Once a resource has been defined that way, you can continue to work with the resource in the UI. Refresh the browser to see new resources after you have added them in the file system.

The UI shows you a list of known resources. Alongside each resource there are buttons which allow you to work with the responses for that method.

Click the button for a ReST method (e.g. GET) to define possible responses for that method. A popup appears that shows the possible responses and allows to add new responses. Initially there are no `success` and `error` responses defined, therefore you only see a `middleware` response. The node-mock-server can respond through a [middleware definition](https://github.com/smollweide/node-mock-server/blob/master/doc/readme-middleware.md), so *middleware* is always available.

Hit *+Add* to add a new response and call it `success`. Your favorite JSON editor is fired up where you can enter the response. It will be stored as _success.json_ inside the _mock_ directory.

After storing the response you can select the radiobutton in front of your new `success` response. A file _response.txt_ will be created alongside your possible responses, which stores your decision. All decisions can be captured, restored, reset and shared by means of a [collection](https://github.com/smollweide/node-mock-server/blob/master/doc/readme-collections.md).

You can also add an `error` response and use the radiobutton in front of it to specify that the resource should respond with an error response. For an error response the default HTTP status code is 500, but you can specify a different status code by suffixing the name of your error response with the appropriate status code, like error-401.
