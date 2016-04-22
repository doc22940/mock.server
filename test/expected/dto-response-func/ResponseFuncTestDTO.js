
var faker = require('faker');

module.exports = {

	importedResponseFuncTestDTO: function () {
		return JSON.stringify({
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
  "phone": faker.phoneNumber.phoneNumber(),
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