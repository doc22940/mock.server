# Express Middleware

For static content delivery beside the mock response itself, you can define express middleware.
Read more in [express documentation](http://expressjs.com/en/4x/api.html#app.use).

Each first level entry describes one `app.use` and each each second entry the arguments.

```
expressMiddleware: [
	['/public', express.static(__dirname + '/public')],
	['/dist', express.static(__dirname + '/dist')]
],
```

Express result:
```
app.use('/public', express.static(__dirname + '/public'));
app.use('/dist', express.static(__dirname + '/dist'));
```

[example](/demo/index.js#L37)
