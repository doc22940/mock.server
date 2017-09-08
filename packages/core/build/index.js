"use strict";

var _nodeMockServerUuid = require("node-mock-server-uuid");

// const { encode, decode } = require("node-mock-server-uuid");

var uuid = (0, _nodeMockServerUuid.encode)("/app/v1/products/:productId");

console.log(uuid);
console.log((0, _nodeMockServerUuid.decode)(uuid));