#!/usr/bin/env node
/* eslint no-console: 0*/
'use strict';

const fs = require('fs');
const start = require('../dist/index').default;

const cwd = fs.realpathSync(process.cwd());

start({
	cwd: cwd,
});
