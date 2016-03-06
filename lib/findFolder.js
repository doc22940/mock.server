
var fs = require('fs'),
	findFolder;

/**
 *
 * @function _isPathMatch
 * @param {string} pathPatter
 * @param {string} path
 * @returns {boolean} isPathMatch
 * @private
 */
function _isPathMatch (pathPatter, path) {

	var pathPatterSpl = pathPatter.split('#'),
		pathSpl = path.split('#');

	pathSpl.forEach(function (pathItem, index) {
		var pathPatterItem = pathPatterSpl[index];

		if (/({)(.*)(})/.test(pathPatterItem)) {
			pathSpl[index] = pathPatterItem;
		}
	});

	return pathSpl.join('#') === pathPatter;
}

findFolder = function (path, options) {

	path = path.split('?')[0];

	var pathArr = path.split('/'),
		restPathLength = options.restPath.split('/').length + 1,
		pathRoot = pathArr.splice(0, restPathLength).join('/'),
		pathFolder = '#' + pathArr.join('#'),
		pathFolderArr,
		dirs, output = '', i;

	if (pathFolder === '#') {
		return pathRoot + '/#';
	}

	dirs = fs.readdirSync(pathRoot);
	pathFolderArr = pathFolder.split('#');

	for (i = 0; i < dirs.length; i += 1) {
		var item = dirs[i],
			itemArr = item.split('#');

		if (item !== 'preferences.json' && itemArr.length === pathFolderArr.length) {

			if (item === pathFolder) {
				output = pathRoot + '/' + item;
				i = dirs.length + 1;
			} else {
				if (_isPathMatch(item, pathFolder)) {
					output = pathRoot + '/' + item;
					i = dirs.length + 1;
				}
			}
		}
	}

	return output;

};

module.exports = findFolder;