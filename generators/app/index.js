var generators = require('yeoman-generator');
var _ = require('lodash');

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
	},
	writing : {
		// copy the configuration files
		config : function() {
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
	  		this.directory('src', 'src');
	  		this.directory('server', 'server');
	  		this.directory('gulp', 'gulp');
	  		this.directory('e2e', 'e2e');

	  		this.fs.delete(this.destinationPath('src/_index.html'));
      		this.fs.copyTpl(
				this.templatePath('src/_index.html'),
				this.destinationPath('src/index.html'), {
					name: this.name
				});


      		this.fs.delete(this.destinationPath('src/app/_app.js'));
      		this.fs.copyTpl(
				this.templatePath('src/app/_app.js'),
				this.destinationPath('src/app/app.js'), {
					name: this.name
				});

      		this.fs.delete(this.destinationPath('gulp/_conf.js'));
      		this.fs.copyTpl(
				this.templatePath('gulp/_conf.js'),
				this.destinationPath('gulp/conf.js'), {
					name: this.name
				});


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
	  	this.bowerInstall([
			    "jquery",
			    "angular",
			    "json3",
			    "es5-shim",
			    "bootstrap",
			    "angular-bootstrap",
			    "angular-resource",
			    "angular-cookies",
			    "angular-sanitize",
			    "font-awesome",
			    "lodash",
			    "angular-ui-router"
			], { 'save': true } );

	  	this.bowerInstall([
	  		"angular-mocks",
	  		"angular-scenario"
	  	], {"save-dev" : true});
	  }
	},
	prompting: function () {
    	var done = this.async();
    	this.prompt({
	      	type    : 'input',
	      	name    : 'name',
	      	message : 'Your project name',
	      	default : this.name // Default to current folder name
	    }, function (answers) {
	    	this.props = answers;

			this.log(answers.name);
			done();
		}.bind(this));
	  }
	}
);
