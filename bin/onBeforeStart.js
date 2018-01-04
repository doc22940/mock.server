#!/usr/bin/env node
/* eslint no-console: 0*/
const opn = require('opn');
// const execa = require('execa');

opn('https://material-ui-next.com/demos/app-bar/');
opn('https://material.io/icons/');
opn('http://localhost:3003/endpoints');

// execa('killall', ['node']).then(() => {
// 	process.exit();
// });

process.exit();
