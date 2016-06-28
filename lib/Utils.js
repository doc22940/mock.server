'use strict';

var fs = require('fs'),
	log = require('chip')(),
	jQueryExtend = require('extend');

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
	 * @public
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
	 * @public
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
	 * @public
	 */
	isFilledString: function (value) {
		return (typeof value === 'string' && value !== '');
	},

	/**
	 *
	 * @method getStats
	 * @param {string} dirFileName
	 * @returns {object} getStats
	 * @public
	 */
	getStats: function (dirFileName) {
		return fs.statSync(dirFileName);
	},

	/**
	 *
	 * @method isDir
	 * @param {string} dirName
	 * @returns {boolean} isDir
	 * @public
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
	 * @public
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
	 * @public
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
	 * @public
	 */
	writeFile: function (path, data) {
		fs.writeFileSync(path, data);
	},

	/**
	 *
	 * @method readFile
	 * @param {string} path
	 * @returns {string}
	 * @public
	 */
	readFile: function (path) {
		return fs.readFileSync(path, 'utf8');
	},

	/**
	 *
	 * @method removeFile
	 * @param {string} path
	 * @public
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
	 * @public
	 */
	readDir: function (dir, ignoreFiles) {
		var results = [],
			list = [];

		ignoreFiles = ignoreFiles || [];

		try {
			list = fs.readdirSync(dir);
		} catch (err) {
			if (process.env.NODE_ENV !== 'test') {
				log.error('Folder "' + err.path + '" not found!');
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
	 *
	 * @method removeDir
	 * @param {string} path
	 * @public
	 */
	removeDir: function (path) {
		try {
			if( fs.existsSync(path) ) {
				fs.readdirSync(path).forEach(function(file){
					var curPath = path + '/' + file;
					if(fs.lstatSync(curPath).isDirectory()) { // recurse
						this.removeDir(curPath);
					} else { // delete file
						fs.unlinkSync(curPath);
					}
				});
				fs.rmdirSync(path);
			}
		} catch (err) {}
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
	},

	/**
	 *
	 * @method getPreferences
	 * @param {object} obj
	 * @returns {object} preferences
	 * @public
	 */
	getPreferences: function (obj) {
		var data = {},
			file = obj.restPath + '/preferences.json';

		try {
			data = JSON.parse(this.readFile(file));
		} catch (err) {}

		return data;
	},

	/**
	 *
	 * @method getMethodStore
	 * @param {string} path
	 * @returns {object}
	 * @public
	 */
	getMethodStore: function (path) {

		var pathFull = path + '/.store.json';

		if (!this.existFile(pathFull)) {
			return {};
		}

		try {
			return JSON.parse(this.readFile(pathFull));
		} catch (err) {}

		return {};
	},

	/**
	 *
	 * @method setMethodStore
	 * @param {string} path
	 * @param {object} data
	 * @returns {void}
	 * @public
	 */
	setMethodStore: function (path, data) {

		var pathFull = path + '/.store.json',
			originalData = this.getMethodStore(path),
			outData = jQueryExtend(true, originalData, data);

		this.writeFile(pathFull, JSON.stringify(outData, null, 2));
	},

	/**
	 *
	 * @method typeOf
	 * @param {*} value
	 * @returns {String}
	 * @public
	 */
	typeOf: function (value) {
		return (value instanceof Array) ? 'array' : typeof value;
	},

	/**
	 *
	 * @method cleanPath
	 * @param {Object} options
	 * @param {String} path
	 * @returns {String}
	 * @public
	 */
	cleanPath: function (options, path) {

		if (typeof path !== 'string') {
			return '';
		}

		if (typeof options !== 'object' || !options.restPath) {
			return path;
		}

		return path.replace(options.restPath, '');
	}

};

module.exports = Utils;