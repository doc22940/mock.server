'use strict';

var fs = require('fs');

/**
 *
 * @class Utils
 * @namespace node-mock-server
 * @constructor
 *
 * Swagger importer
 */
function Utils() {
	this.init();
}

Utils.prototype = {

	constructor : Utils,

	/**
	 *
	 * @method init
	 * called by constructor
	 * @returns void
	 * @public
	 */
	init: function () {
	},

	/**
	 *
	 * @method forIn
	 * @param {object} obj
	 * @param {function} callback
	 * @returns void
	 * @protected
	 */
	forIn: function (obj, callback) {
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				callback.call(this, key, obj[key]);
			}
		}
	},

	/**
	 *
	 * @method for
	 * @param {Array} arr
	 * @param {function} callback
	 * @returns void
	 * @protected
	 */
	for: function (arr, callback) {

		var i, len = arr.length;

		for (i = 0; i < len; i +=1) {
			callback.call({}, arr[i], i);
		}
	},

	/**
	 *
	 * @method isFilledString
	 * @param {string} value
	 * @returns {boolean} isFilledString
	 * @protected
	 */
	isFilledString: function (value) {
		return (typeof value === 'string' && value !== '');
	},

	/**
	 *
	 * @method getStats
	 * @param {string} dirFileName
	 * @returns {object} getStats
	 * @protected
	 */
	getStats: function (dirFileName) {
		return fs.statSync(dirFileName);
	},

	/**
	 *
	 * @method isDir
	 * @param {string} dirName
	 * @returns {boolean} isDir
	 * @protected
	 */
	existDir: function (dirName) {

		var isDir = false;

		try {
			isDir = this.getStats(dirName).isDirectory();
		} catch (err) {}

		return isDir;
	},


	/**
	 *
	 * @method existFile
	 * @param {string} path
	 * @returns {boolean} isFile
	 * @protected
	 */
	existFile: function (path) {

		var isFile = false;

		try {
			isFile = this.getStats(path).isFile();
		} catch (err) {}

		return isFile;
	},

	/**
	 *
	 * @method writeDir
	 * @param {string} dirName
	 * @protected
	 */
	writeDir: function (dirName) {
		if (!this.existDir(dirName)) {
			fs.mkdirSync(dirName);
		}
	},

	/**
	 *
	 * @method writeFile
	 * @param {string} path
	 * @param {object} data
	 * @protected
	 */
	writeFile: function (path, data) {
		fs.writeFileSync(path, data);
	},

	/**
	 *
	 * @method readFile
	 * @param {string} path
	 * @returns {string}
	 * @protected
	 */
	readFile: function (path) {
		return fs.readFileSync(path, 'utf8');
	},

	/**
	 *
	 * @method removeFile
	 * @param {string} path
	 * @protected
	 */
	removeFile: function (path) {
		try {
			fs.unlinkSync(path);
		} catch (err) {}
	},

	/**
	 *
	 * @method writeFile
	 * @param {string} dir
	 * @param {Array|undefined} ignoreFiles
	 * @protected
	 */
	readDir: function (dir, ignoreFiles) {
		var results = [],
			list = [];

		ignoreFiles = ignoreFiles || [];

		try {
			list = fs.readdirSync(dir);
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
	},
	/**
	 * Capitalizes the first letter of the given string.
	 *
	 * @method capitalize
	 * @param {String} str
	 *      The original string
	 * @return {String}
	 *      The capitalized string
	 */
	capitalize: function(str) {
		// Capitalize the first letter
		return str.substr(0, 1).toUpperCase().concat(str.substr(1));
	},

	/**
	 * Camelizes the given string.
	 *
	 * @method toCamel
	 * @param {String} str
	 *      The original string
	 * @return {String}
	 *      The camelized string
	 */
	toCamel: function(str) {
		return str.replace(/(\-[A-Za-z])/g, function($1) {
			return $1.toUpperCase().replace('-', '');
		});
	}

};

module.exports = Utils;