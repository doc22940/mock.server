"use strict";

const babelJest = require("babel-jest");
const babelTransformOptions = require("../config/babel-transform-options");

module.exports = babelJest.createTransformer(babelTransformOptions);
