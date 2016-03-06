
var getResponseData = function (req, method) {

	var responseData = {};

	switch (method) {
		case 'POST':	responseData = req.body; break;
		case 'GET':		responseData = req.query; break;
		case 'PUT':		responseData = req.body; break;
		case 'PATCH':	responseData = req.body; break;
		case 'DELETE':	responseData = req.body; break;
	}

	return responseData;
};

module.exports = getResponseData;