# generator-angular-proxy
Yeoman generator that creates AngularJS project with possibility to write your proxy server and to use remote server as your backend.

### General idea
If you are frontend developer with someone else writing the backend, this is the generator for you. Write only frontend code and use remote backend. If you want, you can mock some requests, until backend is ready.

It also supports Maven build if you want (you will be prompted with a question).

### Usage

Install `yo`, `gulp-cli`, `bower`, and `generator-angular-proxy`:
```
npm install -g yo gulp-cli bower generator-angular-proxy
```

Make a new directory, and `cd` into it:
```
mkdir my-new-project && cd $_
```

Run `yo angular-proxy` passing an app name:
```
yo angular-proxy [app-name]
```

You will be prompted with a few questions:

```
Page title (it will be displayed in tab)? ()
Project description (it will be set to meta description)? ()
Which angular version (1.x version) you want to use? (latest)
Do you want to use Bootstrap? (Y/n) (Y)
Do you want to use Bootstrap LESS (it will be compiled into your css, but you will be able to use it's variables)? (Y/n) (Y) // in case you want to inherit/use Bootstrap LESS variables, select yes, otherwise it will use Bootstrap's css and just concatenate with other vendors
Do you want to use angular-resource? (Y/n) (Y) // installs angular-resource
Do you want to use angular-cookies? (Y/n) (Y) // installs angular-cookies
Do you want to use angular-sanitize? (Y/n) (Y) // installs angular-sanitize
Do you want to use Angular UI Router (https://github.com/angular-ui/ui-router)? (Y/n) (Y) // otherwise, you will have to use AngularJS's native routing
Are you going to support unit tests? (Y/n) (Y) // it will generate karma.conf.js and test examples
Are you going to use Maven for packaging? (Y/n) (Y) // in case you select yes, you will get some Maven specific questions which will be used for pom.xml

  Enter groupId:
  Enter artifactId:
  Enter name:
  Enter final name:
  Enter node version (vX.X.X, https://nodejs.org/en/download/releases/): v5.9.1
  Enter NPM version (X.X.X, https://github.com/npm/npm/releases): 3.7.0
```
## Development
After you answered all the questions it will install NPM and Bower dependencies.

Also, you will get examples of routing and unit tests inside the core module.

### Modules

Application should be developed with the modules (separated by the functionality) in mind. Each time you add new module, you will have to create module.js iside the route folder of the module which is responsible for registering it (see core example).

Also, add that module name into app.js to load it.

### Running your project

#### Development mode
```
gulp serve
```

#### Production mode
```
gulp serve:dist
```

#### Running/writing tests
Tests are using Karma runner and Jasmine assertion library.

You have got example of the test together with the generated project to see how write the basic test.

```
gulp test
gulp test:auto // runs the test and runs the constantly (each time you change file it will re-run the tests)
```

### Mocking servers
There is a server folder delivered together with your frontend project where you can mock routes if you want.
```
server
----api
--------testing
------------index.js
----config
--------environment
--------conf.js
--------express.js
```
The imporant thing here is conf.js and mocked-routes.js.

Inside conf.js you will define where your remote backend will be (targetServer) and on which URL rest is (restApi) and if you want to use mock server, you can define on which port to be started. If you need only remote backend, just comment mockServer part.
```
// conf.js

// where real server will be
exports.targetServer = {
    ip : 'http://127.0.0.1',
    port : 3000,
    restApi : '/api' // used only in case ONLY targetServer is present (otherwise, mock server will put entire request through)
}

// where mocked server will be
// if you want to go directly to server each time, comment out below
exports.mockServer = {
    port : 3002,
    ip : '0.0.0.0',
    restApi : '/api'
}

```

Inside mocked-routes.js you just have to list files which you want to load to behave as your mocked routes:

```
module.exports = function(app) {
    require('./api/testing')(app);
};
```

There is an example inside api/testing/index.js how to mock some of the routes.

#### Using only target server
You can develop your frontend by just using your frontend project and using remote backend.

#### Using mock and target server
You can develop your frontend by just using your frontend project and using remote backend, but in case remote backend is still missing some API you can write it inside your project.

