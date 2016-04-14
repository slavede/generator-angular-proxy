var generators = require('yeoman-generator');
var _ = require('lodash');
var rmdir = require('rmdir');
var fs = require('fs');

module.exports = generators.Base.extend({
	// The name `constructor` is important here
	constructor: function () {
		// Calling the super constructor is important so our generator is correctly set up
		generators.Base.apply(this, arguments);

		// Next, add your custom code
		this.option('sass'); // This method adds support for a `--sass` flag
		this.isSass = (this.options.sass ? true: false);

		// This makes `name` a required argument.
		this.argument('name', { type: String, required: true });

		this.log('Creating project ' + this.name);

		this.bowerDependencies = [
			"jquery",
			"angular",
		    "json3",
		    "es5-shim"
		];

		this.bowerDevDependencies = [];
	},
	writing : {
		// copy the configuration files
		config : function() {
			this.log('Copying configuration files');
			this.fs.copyTpl(
				this.templatePath('_package.json'),
				this.destinationPath('package.json'), {
					name: this.name
				});

          	this.fs.copyTpl(
				this.templatePath('_bower.json'),
				this.destinationPath('bower.json'), {
					name: this.name
				});

          	this.fs.copyTpl(
				this.templatePath('_karma.conf.js'),
				this.destinationPath('karma.conf.js'), {
					name: this.name
				});

			this.fs.copy(
				this.templatePath('_bowerrc'),
				this.destinationPath('.bowerrc'));


			this.fs.copy(
				this.templatePath('.buildignore'),
				this.destinationPath('.buildignore'));

			this.fs.copy(
				this.templatePath('.editorconfig'),
				this.destinationPath('.editorconfig'));

			this.fs.copy(
				this.templatePath('.gitattributes'),
				this.destinationPath('.gitattributes'));

			this.fs.copy(
				this.templatePath('.gitignore'),
				this.destinationPath('.gitignore'));

			this.fs.copy(
				this.templatePath('.travis.yml'),
				this.destinationPath('.travis.yml'));

			this.fs.copy(
				this.templatePath('.yo-rc.json'),
				this.destinationPath('.yo-rc.json'));

			this.fs.copy(
				this.templatePath('gulpfile.js'),
				this.destinationPath('gulpfile.js'));

			this.fs.copy(
				this.templatePath('protractor.conf.js'),
				this.destinationPath('protractor.conf.js'));
		},
	  	//Copy application files
	  	app : function() {
            var injectOptions = {
                name: this.name,
                useRouter : this.useRouter,
                useBootstrap : this.useBootstrap,
                useAngularResource: this.useAngularResource,
                useAngularCookies: this.useAngularCookies,
                useAngularSanitize: this.useAngularSanitize
            };

	  		this.log('Copying app files');
	  		this.directory('src', 'src');
	  		this.directory('server', 'server');
	  		this.directory('gulp', 'gulp');
	  		this.directory('e2e', 'e2e');

	  		this.fs.delete(this.destinationPath('src/_index.html'));
      		this.fs.copyTpl(
				this.templatePath('src/_index.html'),
				this.destinationPath('src/index.html'), {
					name: this.name,
					useRouter : this.useRouter
				});


      		this.fs.delete(this.destinationPath('src/app/_app.js'));
      		this.fs.copyTpl(
				this.templatePath('src/app/_app.js'),
				this.destinationPath('src/app/app.js'), injectOptions);

      		this.fs.delete(this.destinationPath('gulp/_conf.js'));
      		this.fs.copyTpl(
				this.templatePath('gulp/_conf.js'),
				this.destinationPath('gulp/conf.js'), {
					name: this.name
				});

      		// example files (core module)

      		this.fs.delete(this.destinationPath('src/app/modules/core/_module.js'));
      		this.fs.copyTpl(
				this.templatePath('src/app/modules/core/_module.js'),
				this.destinationPath('src/app/modules/core/module.js'), injectOptions);

      		this.fs.delete(this.destinationPath('src/app/modules/core/templates/_hello_world.html'));
      		this.fs.copyTpl(
				this.templatePath('src/app/modules/core/templates/_hello_world.html'),
				this.destinationPath('src/app/modules/core/templates/hello_world.html'), injectOptions);

      		this.fs.delete(this.destinationPath('src/app/modules/core/templates/hello_world/_nested1.html'));
      		this.fs.copyTpl(
				this.templatePath('src/app/modules/core/templates/hello_world/_nested1.html'),
				this.destinationPath('src/app/modules/core/templates/hello_world/nested1.html'), injectOptions);

      		this.fs.delete(this.destinationPath('src/app/modules/core/templates/hello_world/_nested2.html'));
      		this.fs.copyTpl(
				this.templatePath('src/app/modules/core/templates/hello_world/_nested2.html'),
				this.destinationPath('src/app/modules/core/templates/hello_world/nested2.html'), injectOptions);
	  	}
	  },
	  //Install Dependencies,
    install: function() {
        this.npmInstall([
		    "body-parser",
		    "browser-sync",
		    "composable-middleware",
		    "compression",
		    "cookie-parser",
		    "ejs",
		    "errorhandler",
		    "express",
		    "lodash",
		    "method-override",
		    "morgan",
		    "serve-favicon",
		    "wiredep"
	  	], {
	  		'save' : true
	  	});
	  	this.npmInstall([
			"babel-core",
			"babel-loader",
			"browser-sync-spa",
			"chalk",
			"connect-livereload",
			"del",
			"eslint",
			"eslint-loader",
			"eslint-plugin-angular",
			"estraverse",
			"express-http-proxy",
			"gulp",
			"gulp-angular-templatecache",
			"gulp-autoprefixer",
			"gulp-eslint",
			"gulp-filter",
			"gulp-flatten",
			"gulp-inject",
			"gulp-less",
			"gulp-load-plugins",
			"gulp-minify-css",
			"gulp-minify-html",
			"gulp-protractor",
			"gulp-rename",
			"gulp-replace",
			"gulp-rev",
			"gulp-rev-replace",
			"gulp-size",
			"gulp-sourcemaps",
			"gulp-uglify",
			"gulp-useref",
			"gulp-using",
			"gulp-util",
			"gulp-watch",
			"http-proxy-middleware",
			"jasmine-core",
			"jshint-stylish",
			"karma",
			"karma-babel-preprocessor",
			"karma-chrome-launcher",
			"karma-coffee-preprocessor",
			"karma-coverage",
			"karma-firefox-launcher",
			"karma-html2js-preprocessor",
			"karma-jade-preprocessor",
			"karma-jasmine",
			"karma-ng-html2js-preprocessor",
			"karma-ng-jade2js-preprocessor",
			"karma-ng-scenario",
			"karma-phantomjs-launcher",
			"karma-requirejs",
			"karma-script-launcher",
			"lodash",
			"main-bower-files",
			"ng-annotate",
			"open",
			"phantomjs-prebuilt",
			"requirejs",
			"should",
			"supertest",
			"uglify-save-license",
			"wrench"
	  	], {
	  		'save-dev' : true
	  	});
	  	this.bowerInstall(this.bowerDependencies, { 'save': true } );

	  	if (this.bowerDevDependencies.length > 0) {
	  		this.bowerInstall(this.bowerDevDependencies, {'save-dev' : true});
	  	}
	  
	},
    end : function() {
        var bowerContent, packageContent, that = this;
        if (this.unitTests === false) {
            console.log('Removing test folder!');
            console.log(this.destinationPath('src/app/modules/core/tests'));
            rmdir(this.destinationPath('src/app/modules/core/tests'));
        }
        // replace all tildes and carets from bower.json and package.json to use concrete version
        // so when someone else installs it he gets exact version
        // because we can't assure who ever publishes new version
        // will mark it correctly
        this.fs.commit(function() {
            that.log('Reading from ');
            that.log(that.destinationPath('bower.json'));
            bowerContent = fs.readFileSync(that.destinationPath('bower.json'), "utf8");
            console.log('bowerContent1');
            console.log(bowerContent);
            bowerContent = bowerContent.replace(/\^/g, '').replace(/~/g, '');
            console.log('bowerContent2');
            console.log(bowerContent);
            fs.writeFileSync(that.destinationPath('bower.json'), bowerContent);

            packageContent = fs.readFileSync(that.destinationPath('package.json'), "utf8");
            console.log('packageContent');
            console.log(packageContent);
            packageContent = packageContent.replace(/\^/g, '').replace(/~/g, '');
            fs.writeFileSync(that.destinationPath('package.json'), packageContent);
        });
    },
	prompting: {
        prompt1 : function() {
            var done = this.async();
            this.prompt({
                type    : 'input',
                name    : 'angularVersion',
                message : 'Which angular version you want to use?',
                default : 'latest'
            }, function (answers) {
                this.angularVersion = answers.angularVersion;
                if (this.angularVersion === 'latest') {
                    this.angularVersion = '';
                } else {
                    this.angularVersion = '#' + this.angularVersion;
                }
                
                done();
            }.bind(this));
        },
		prompt2 : function() {
			var done = this.async();
	    	this.prompt({
		      	type    : 'input',
		      	name    : 'useBootstrap',
		      	message : 'Do you want to use Bootstrap? (Y/n)',
		      	default : 'Y'
		    }, function (answers) {
		    	this.useBootstrap = false;
		    	if (answers.useBootstrap === 'Y') {
		    		this.useBootstrap = true;
		    		this.bowerDependencies.push('bootstrap');
		    		this.bowerDependencies.push('angular-bootstrap');
		    	} else if (answers.useBootstrap !== 'n') {
		    		this.useBootstrap = true;
		    		this.log('Unknown option. Going with default answer (Y)');
		    		this.bowerDependencies.push('bootstrap');
		    		this.bowerDependencies.push('angular-bootstrap');
		    	}
		    	
				done();
			}.bind(this));
		},
		prompt3 : function() {
			var done = this.async();
	    	this.prompt({
		      	type    : 'input',
		      	name    : 'useAngularResource',
		      	message : 'Do you want to use angular-resource? (Y/n)',
		      	default : 'Y'
		    }, function (answers) {
                this.useAngularResource = false;
		    	if (answers.useAngularResource === 'Y') {
		    		this.bowerDependencies.push('angular-resource' + this.angularVersion);
                    this.useAngularResource = true;
		    	} else if (answers.useAngularResource !== 'n') {
                    this.useAngularResource = true;
		    		this.log('Unknown option. Going with default answer (Y)');
		    		this.bowerDependencies.push('angular-resource' + this.angularVersion);

		    	}
		    	
				done();
			}.bind(this));
		},
		prompt4 : function() {
			var done = this.async();
	    	this.prompt({
		      	type    : 'input',
		      	name    : 'useAngularCookies',
		      	message : 'Do you want to use angular-cookies? (Y/n)',
		      	default : 'Y'
		    }, function (answers) {
                this.useAngularCookies = false;
		    	if (answers.useAngularCookies === 'Y') {
                    this.useAngularCookies = true;
		    		this.bowerDependencies.push('angular-cookies' + this.angularVersion);
		    	} else if (answers.useAngularCookies !== 'n') {
                    this.useAngularCookies = true;
		    		this.log('Unknown option. Going with default answer (Y)');
		    		this.bowerDependencies.push('angular-cookies' + this.angularVersion);
		    	}
		    	
				done();
			}.bind(this));
		},
		prompt5 : function() {
			var done = this.async();
	    	this.prompt({
		      	type    : 'input',
		      	name    : 'useAngularSanitize',
		      	message : 'Do you want to use angular-sanitize? (Y/n)',
		      	default : 'Y'
		    }, function (answers) {
                this.useAngularSanitize = false;
		    	if (answers.useAngularSanitize === 'Y') {
                    this.useAngularSanitize = true;
		    		this.bowerDependencies.push('angular-sanitize' + this.angularVersion);
		    	} else if (answers.useAngularSanitize !== 'n') {
                    this.useAngularSanitize = true;
		    		this.log('Unknown option. Going with default answer (Y)');
		    		this.bowerDependencies.push('angular-sanitize' + this.angularVersion);
		    	}
		    	
				done();
			}.bind(this));
		},
		prompt6 : function() {
			var done = this.async();
	    	this.prompt({
		      	type    : 'input',
		      	name    : 'useRouter',
		      	message : 'Do you want to use Angular UI Router (https://github.com/angular-ui/ui-router)? (Y/n)',
		      	default : 'Y'
		    }, function (answers) {
		    	if (answers.useRouter === 'Y') {
		    		this.useRouter = true;
		    		this.bowerDependencies.push('angular-ui-router');
		    	} else if (answers.useRouter !== 'n') {
		    		this.log('Unknown option. Going with default answer (Y)');
		    		this.bowerDependencies.push('angular-ui-router');
		    		this.useRouter = true;
		    	} else {
                    this.bowerDependencies.push('angular-route');
		    		this.useRouter = false;
		    	}
				done();
			}.bind(this));
		},
		prompt7 : function() {
			var done = this.async();
	    	this.prompt({
		      	type    : 'input',
		      	name    : 'unitTests',
		      	message : 'Are you going to support unit tests? (Y/n)',
		      	default : 'Y'
		    }, function (answers) {
		    	this.unitTests = answers.unitTests;
		    	if (answers.unitTests === 'Y') {
		    		this.unitTests = true;
		    		this.bowerDevDependencies.push("angular-mocks" + this.angularVersion);
		    		this.bowerDevDependencies.push("angular-scenario" + this.angularVersion);
		    	} else if (answers.unitTests !== 'n') {
		    		this.unitTests = true;
		    		this.log('Unknown option. Going with default answer (Y)');
		    		this.bowerDevDependencies.push("angular-mocks" + this.angularVersion);
		    		this.bowerDevDependencies.push("angular-scenario" + this.angularVersion);
		    	} else {
		    		this.unitTests = false;
		    	}
				done();
			}.bind(this));
		}
	}
});
