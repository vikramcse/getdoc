#!/usr/bin/env node

var ndocs = require('./index.js');
var args = process.argv.slice(2);
ndocs(args[0]);