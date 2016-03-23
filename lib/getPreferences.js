
var fs = require('fs'),
	getPreferences;

getPreferences = function (obj) {

	var data = {},
		file = obj.restPath + '/preferences.json';

	try {
		data = JSON.parse(fs.readFileSync(file, 'utf8'));
	} catch (err) {}

	return data;
};

module.exports = getPreferences;