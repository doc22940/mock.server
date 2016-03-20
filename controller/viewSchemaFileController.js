
'use strict';

var Utils = require('../lib/Utils'),
	utils = new Utils();

/**
 * @function viewSchemaFormatted
 * @param {object} req
 * @param {object} res
 * @returns {void}
 */
module.exports = function (req, res) {

	if (!req.query || !req.query.url) {
		res.send('Not Found');
		return;
	}

	try {
		res.send(utils.readFile(req.query.url));
	} catch (err) {
		res.send('Not Found');
	}

};