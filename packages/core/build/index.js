"use strict";

var _nodeMockServerUuid = require("node-mock-server-uuid");

var uuid = (0, _nodeMockServerUuid.encode)("/app/v1/products/:productId");
/* eslint no-console: 0*/

console.log(uuid);
console.log((0, _nodeMockServerUuid.decode)(uuid));