#!/usr/bin/env node

var getdoc = require('./index.js');
var args = process.argv.slice(2);
getdoc(args[0]);