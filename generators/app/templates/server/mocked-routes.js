/**
 * Main application routes
 */

'use strict';

var path = require('path');

module.exports = function(app) {
  app.use('/api/testing', require('./api/testing'));
};
