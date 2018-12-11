#!/usr/bin/env node --max-old-space-size=8000
'use strict';
/**
 * Module dependencies.
 */
require('./config/init')();
var config = require('./config/config');
// require('./config/setup')();

// Init the express application
var app = require('./config/express')(config);
app.listen(config.port);

// Expose app
exports = module.exports = app;

console.log('================Wechat Server============');
console.log('enviroment:', process.env.NODE_ENV);

console.log('address ' + config.serverAddress);
console.log('port ' + config.port);
console.log('title ' + config.app.description);

