
var faker = require('faker');

module.exports = {

	<%=funcName%>: function () {
		return JSON.stringify(<%=data%>, null, 2);
	}

};