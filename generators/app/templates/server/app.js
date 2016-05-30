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
var url = require('url');
var regexPatterns = [];

if (config.targetServer) {
    var proxy = proxyMiddleware(function(path, req) {
        var useReal = true,
            pathname = url.parse(req.url).pathname;
        // go through all registered routes and test
        regexPatterns.forEach(function(reg) {
            if (pathname.match(reg)) {
                useReal = false;
            }
        });

        if (useReal) {
            console.log('Using real server: ' + path);
        }
        return useReal;
    }, {
        target : config.targetServer.ip + (config.targetServer.port ? (':' + config.targetServer.port) : ''),
        changeOrigin:true
    });

    app.use(proxy);
}


var server = require('http').createServer(app);

require('./config/express')(app);
require('./mocked-routes')(app);


app._router.stack.forEach(function(route){
    if (route.route) {
        regexPatterns.push(route.regexp);    
    }    
});

console.log('Mocking following patterns: ');
console.log(regexPatterns);


// Start server
var mockServerConf = config.mockServer;


// Start server
var mockServerConf = config.mockServer;

server.listen(mockServerConf.port || 3002, mockServerConf.ip || '0.0.0.0', function () {
  console.log('Express server listening on %d, in %s mode', mockServerConf.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
