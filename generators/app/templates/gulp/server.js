'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

var util = require('util');

var proxyMiddleware = require('http-proxy-middleware');
var mockServerConf = require('../server/config/conf');

var $ = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del', 'run-sequence']
});

function browserSyncInit(baseDir, browser) {
    browser = browser === undefined ? 'default' : browser;

    var routes = null,
        middlewares = [
                function(req, res, next) {
                    // in future all of the requests should go app/modules/<module_name>
                        if (conf.urlReplace && conf.urlReplace.length > 0) {
                                // console.log('Replacing url');
                                // console.log(req.url);
                                conf.urlReplace.forEach(function(urlReplace) {
                                        req.url = req.url.replace(urlReplace.source, urlReplace.target);
                                })
                                // console.log('Done replacing url');
                                // console.log(req.url);
                        }

                        return next();
                }
        ];
    if(baseDir === conf.paths.src || (util.isArray(baseDir) && baseDir.indexOf(conf.paths.src) !== -1)) {
        routes = {
            '/bower_components': 'bower_components'
        };
    }

    var server = {
        baseDir: baseDir,
        routes: routes
    };

    /*
     * You can add a proxy to your backend by uncommenting the line below.
     * You just have to configure a context which will we redirected and the target url.
     * Example: $http.get('/users') requests will be automatically proxified.
     *
     * For more details and option, https://github.com/chimurai/http-proxy-middleware/blob/v0.9.0/README.md
     */

        // this is where your mocked server should live
        // you can put here your real server if you don't want to have
        // local mock server (use targetServe only then)

        // if you have local mock server
        // make sure it's going to real server
        // when you are testing server

        // everything is configured in ../server/config/conf

    if (mockServerConf && mockServerConf.mockServer) {
        console.log('Found mockServerConf');
        console.log(mockServerConf)
        middlewares.push(proxyMiddleware(mockServerConf.mockServer.restApi || '/api', {target: 'http://localhost:' + mockServerConf.mockServer.port, changeOrigin: true}));
        var app = require('../server/app');
    } else if (mockServerConf && mockServerConf.targetServer) {
        console.log('Found only targetServer');
        console.log(mockServerConf.targetServer);
        middlewares.push(proxyMiddleware(mockServerConf.targetServer.restApi || '/api', {target: mockServerConf.targetServer.ip + ':' + mockServerConf.targetServer.port, changeOrigin: true}));
    }

        console.log('starting with middleware');
        console.log(middlewares);
        server.middleware = middlewares;

    browserSync.instance = browserSync.init({
        startPath: '/',
        server: server,
        browser: browser
    });
}

browserSync.use(browserSyncSpa({
    selector: '[ng-app]'// Only needed for angular apps
}));

gulp.task('serve', function () {
    var runBrowserSync = function() {
        browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src]);    
    };

    $.runSequence('clean:tmp', 'watch', runBrowserSync);
});

gulp.task('serve:dist', ['build'], function () {
    var runBrowserSync = function() {
        browserSyncInit(conf.paths.dist);  
    };

    $.runSequence('clean', 'build', runBrowserSync);
});

gulp.task('serve:e2e', ['inject'], function () {
    browserSyncInit([conf.paths.tmp + '/serve', conf.paths.src], []);
});

gulp.task('serve:e2e-dist', ['build'], function () {
    browserSyncInit(conf.paths.dist, []);
});
