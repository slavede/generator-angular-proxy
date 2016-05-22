/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
// var mongoose = require('mongoose');
var config = require('./config/conf');
// var proxy = require('express-http-proxy');
var proxyMiddleware = require('http-proxy-middleware')

// Setup server
var app = express();
var server = require('http').createServer(app);

require('./config/express')(app);
require('./mocked-routes')(app);

if (config.targetServer) {
    var proxy = proxyMiddleware(function(path, req) {
        return true
    }, {
        target : config.targetServer.ip + (config.targetServer.port ? (':' + config.targetServer.port) : ''),
        changeOrigin:true
    });

    app.use(proxy);
}


// Start server
var mockServerConf = config.mockServer;

server.listen(mockServerConf.port || 3002, mockServerConf.ip || '0.0.0.0', function () {
  console.log('Express server listening on %d, in %s mode', mockServerConf.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
