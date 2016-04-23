/* eslint-disable */
/* jshint ignore:start */
'use strict';

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

	importedResponseFuncTestDTO: function (loopArr) {

		var found1;

        if (!(loopArr instanceof Array)) {
        	loopArr = [];
        }

        found1 = loopArr.indexOf('importedResponseFuncTestDTO');

        if (found1 >= 0) {
        	if (loopArr.indexOf('importedResponseFuncTestDTO', found1 + 1) >= 0) {
        		return '{}';
        	}
        }

        loopArr.push('importedResponseFuncTestDTO');

		return JSON.stringify({
  "list": _getArray(function () {return {  "country": JSON.parse(require('../func-imported/CountryWsDTO.js').importedCountryWsDTO(loopArr.slice())),  "email": faker.internet.email()};}),
  "items": _getArray(function () {return JSON.parse(require('../func-imported/CountryWsDTO.js').importedCountryWsDTO(loopArr.slice()));}),
  "image": JSON.parse(require('../func-imported/CountryWsDTO.js').importedCountryWsDTO(loopArr.slice())),
  "exampleString": faker.lorem.word(),
  "exampleNumber": faker.random.number(),
  "exampleInteger": faker.random.number(),
  "name": faker.name.findName(),
  "firstName": faker.name.firstName(),
  "lastName": faker.name.lastName(),
  "country": JSON.parse(require('../func-imported/CountryWsDTO.js').importedCountryWsDTO(loopArr.slice())),
  "countryIsocode": "CH",
  "email": faker.internet.email(),
  "phone": faker.phone.phoneNumber(),
  "postalCode": faker.address.zipCode(),
  "streetName": faker.address.streetName(),
  "streetNumber": faker.random.number(),
  "title": faker.name.prefix(),
  "titleCode": faker.random.arrayElement(["mr","ms"]),
  "town": faker.address.city(),
  "ruleTest1": "Rule value",
  "ruleTest2": faker.company.companyName(),
  "ruleTest3": faker.random.arrayElement(["a","b","c"]),
  "ruleTest4": {
    "name": faker.name.findName(),
    "company": faker.company.companyName()
  },
  "ruleTest5": _getArray(function () {return {  "name": faker.name.findName(),  "company": faker.company.companyName()};}),
  "ruleTest6": faker.random.number(),
  "ruleTestType1": faker.random.number(),
  "ruleTestType4": _getArray(function () {return {  "email": faker.internet.email()};}),
  "ruleTestType5": {
    "email": faker.internet.email()
  },
  "parameters": {
    "additional": faker.lorem.word()
  }
}, null, 2);
	}

};

/* jshint ignore:end */
/* eslint-enable */