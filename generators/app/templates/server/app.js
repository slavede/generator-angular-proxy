/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');

var config = require('./config/conf');
var proxyMiddleware = require('http-proxy-middleware')
var mockRoutes = {
    '/api/testing' : '*',
    // '/api/fb/api/testing' : '*',
    // '/api/v2/testing' : ['GET', 'POST']
    // put routes here which you want to handle with mocked server

    // add those routes defintion inside mocked-routes.js
};

// Setup server
var app = express();
var url = require('url');

if (config.targetServer) {
    var proxy = proxyMiddleware(function(path, req) {
        var pathname = url.parse(req.url).pathname,
            useRealServer = false;
        if (!mockRoutes[pathname]) {
            useRealServer =  true;
        } else {
            if (mockRoutes[pathname] === '*') {
                useRealServer = false;
            } else if (mockRoutes[pathname].indexOf(req.method) === -1) {
                useRealServer = true;
            }
        }

        if (useRealServer) {
            console.log('Using proxy');
            console.log(config.targetServer);
        }

        return useRealServer;
    }, {
        target : config.targetServer.ip + (config.targetServer.port ? (':' + config.targetServer.port) : ''),
        changeOrigin:true
    });

    app.use(proxy);
}




var server = require('http').createServer(app);

require('./config/express')(app);
require('./mocked-routes')(app);

// Start server
var mockServerConf = config.mockServer;

server.listen(mockServerConf.port || 3002, mockServerConf.ip || '0.0.0.0', function () {
  console.log('Express server listening on %d, in %s mode', mockServerConf.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
