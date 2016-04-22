
var faker = require('faker');

function _getArray(getData) {
	var out = [],
		len = faker.random.number(10) + 1,
		i;

	for (i = 0; i < len; i += 1) {
		out.push(getData());
	}

	return out;
}

module.exports = {

	<%=funcName%>: function () {
		return JSON.stringify(<%=data%>, null, 2);
	}

};