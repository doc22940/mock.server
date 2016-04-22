
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

	importedResponseFuncTestDTO: function () {
		return JSON.stringify({
  "list": _getArray(function () {return {  "country": JSON.parse(require('../func-imported/CountryWsDTO.js').importedCountryWsDTO()),  "email": faker.internet.email()};}),
  "items": _getArray(function () {return JSON.parse(require('../func-imported/CountryWsDTO.js').importedCountryWsDTO());}),
  "image": JSON.parse(require('../func-imported/CountryWsDTO.js').importedCountryWsDTO()),
  "exampleString": faker.lorem.word(),
  "exampleNumber": faker.random.number(),
  "exampleInteger": faker.random.number(),
  "name": faker.name.findName(),
  "firstName": faker.name.firstName(),
  "lastName": faker.name.lastName(),
  "country": JSON.parse(require('../func-imported/CountryWsDTO.js').importedCountryWsDTO()),
  "countryIsocode": "CH",
  "email": faker.internet.email(),
  "phone": faker.phone.phoneNumber(),
  "postalCode": faker.address.zipCode(),
  "streetName": faker.address.streetName(),
  "streetNumber": faker.random.number(),
  "title": faker.name.prefix(),
  "titleCode": faker.random.arrayElement(["mr","ms"]),
  "town": faker.address.city(),
  "parameters": {
    "additional": faker.lorem.word()
  }
}, null, 2);
	}

};