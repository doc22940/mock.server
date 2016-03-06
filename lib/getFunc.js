
var util = require('util'),
	extend = util._extend,
	fs = require('fs'),
	getFunc,
	faker = require('faker');

getFunc = function (path) {

	var func = {},
		list = [];

	function addFunc (path) {
		var out = {};

		try {
			out = require(path);
		} catch (err) {}

		func = extend(func, out);
	}

	function addDirectory (path) {
		try {
			list = fs.readdirSync(path);
		} catch (err) {
			if (process.env.NODE_ENV !== 'test') {
				console.log('Folder "' + path + '" not found!');
			}
		}

		list.forEach(function (item) {
			addFunc(path + '/' + item);
		});
	}

	if (path instanceof Array) {
		path.forEach(function (itemPath) {
			addDirectory(itemPath);
		});
	} else if (typeof(path) === 'string' && path !== '') {
		addDirectory(path);
	}

	func = extend(func, {
		faker: faker
	});

	return func;
};

module.exports = getFunc;