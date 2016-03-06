
var fs = require('fs'),
	helper;

helper = {

	_forIn: function (obj, callback) {

		var key;

		for (key in obj) {
			if (obj.hasOwnProperty(key)) {
				var value = obj[key];
				callback.call({}, key, value);
			}
		}
	},

	_for: function (arr, callback) {

		var i, len = arr.length;

		for (i = 0; i < len; i +=1) {
			callback.call({}, arr[i], i);
		}
	},

	readDir: function (dir, ignoreFiles) {
		var results = [],
			list = [];

		try {
			list = fs.readdirSync(dir)
		} catch (err) {
			if (process.env.NODE_ENV !== 'test') {
				console.log('Folder "' + err.path + '" not found!');
			}
		}

		list.forEach(function(file) {
			if (ignoreFiles.indexOf(file) < 0) {
				results.push({
					path: dir + '/' + file,
					file: file
				});
			}
		});
		return results;
	}

};

module.exports = helper;