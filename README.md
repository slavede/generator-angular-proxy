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

Bower registry location? (leave empty to use default)


```
## Development

### Running your project

#### Development mode

#### Production mode

#### Running tests

### Mocking servers

#### Using only target server
You can develop your frontend by just using your frontend project and using remote backend.

#### Using mock and target server
You can develop your frontend by just using your frontend project and using remote backend, but in case remote backend is still missing some API you can write it inside your project.

##### Mocking routes
