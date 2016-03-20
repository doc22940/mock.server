
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
		var method = req.query.method || 'GET',
			title = (req.query.type || '') + ' Schema',
			path = (req.query.path || '');

		res.render('service-schema.ejs', {
			pageTitle: title,
			title: title + ' | ' + method + ' | ' + path,
			subTitle: path,
			method: method,
			methodLower: method.toLowerCase(),
			schemaJSON: utils.readFile(req.query.url)
		});

	} catch (err) {
		res.send('Not Found');
	}

};