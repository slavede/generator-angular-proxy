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

			this.fs.copy(
				this.templatePath('.editorconfig'),
				this.destinationPath('.editorconfig'));

			this.fs.copy(
				this.templatePath('.gitattributes'),
				this.destinationPath('.gitattributes'));

			this.fs.copy(
				this.templatePath('_gitignore'),
				this.destinationPath('.gitignore'));

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
                useBootstrapLess : this.useBootstrapLess,
                useAngularResource: this.useAngularResource,
                useAngularCookies: this.useAngularCookies,
                useAngularSanitize: this.useAngularSanitize,
                pageTitle : this.pageTitle,
                description : this.description,
                mavenGroupId : this.mavenGroupId,
                mavenArtifactId : this.mavenArtifactId,
                mavenName : this.mavenName,
                mavenFinalName : this.mavenFinalName,
                nodeVersion : this.nodeVersion,
                npmVersion : this.npmVersion
            };
            console.log('injectOptions');
            console.log(injectOptions);

	  		this.log('Copying app files');
	  		this.directory('src', 'src');
	  		this.directory('server', 'server');
	  		this.directory('gulp', 'gulp');
	  		this.directory('e2e', 'e2e');

			this.fs.copyTpl(
				this.templatePath('_package.json'),
				this.destinationPath('package.json'), injectOptions);

          	this.fs.copyTpl(
				this.templatePath('_bower.json'),
				this.destinationPath('bower.json'), injectOptions);

          	this.fs.copyTpl(
				this.templatePath('_karma.conf.js'),
				this.destinationPath('karma.conf.js'), injectOptions);

          	this.fs.copyTpl(
				this.templatePath('_bowerrc'),
				this.destinationPath('.bowerrc'), injectOptions);

	  		this.fs.delete(this.destinationPath('src/_index.html'));
      		this.fs.copyTpl(
				this.templatePath('src/_index.html'),
				this.destinationPath('src/index.html'), injectOptions);

      		this.fs.delete(this.destinationPath('src/app/_app.js'));
      		this.fs.copyTpl(
				this.templatePath('src/app/_app.js'),
				this.destinationPath('src/app/app.js'), injectOptions);

      		this.fs.delete(this.destinationPath('src/app/_app.less'));
      		this.fs.copyTpl(
				this.templatePath('src/app/_app.less'),
				this.destinationPath('src/app/app.less'), injectOptions);

      		this.fs.delete(this.destinationPath('gulp/_conf.js'));
      		this.fs.copyTpl(
				this.templatePath('gulp/_conf.js'),
				this.destinationPath('gulp/conf.js'), injectOptions);

      		this.fs.delete(this.destinationPath('gulp/_build.js'));
      		this.fs.copyTpl(
				this.templatePath('gulp/_build.js'),
				this.destinationPath('gulp/build.js'), injectOptions);


      		if (this.useMaven) {
      		this.fs.delete(this.destinationPath('_pom.xml'));
      		this.fs.copyTpl(
				this.templatePath('_pom.xml'),
				this.destinationPath('pom.xml'), injectOptions);

      		this.directory('WEB-INF', 'WEB-INF');
      		this.fs.delete(this.destinationPath('WEB-INF/_web.xml'));
      		this.fs.copyTpl(
				this.templatePath('WEB-INF/_web.xml'),
				this.destinationPath('WEB-INF/web.xml'), injectOptions);
      		}


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

      		// remove file we had to have because .directory doesn't copy empty folders
      		this.fs.delete(this.destinationPath('src/assets/fonts/place_fonts_here'));
	  	}
	  },
	  //Install Dependencies,
    install: function() {
    	// we have versions hardcoded since
    	// we have set up our build and server with these
    	// it's easy to change those after project is initialized
	  	this.npmInstall();

        this.log('Installing bowerDependencies');
        this.log(this.bowerDependencies)

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

        // commit maybe not needed since we switched to fs module
        this.fs.commit(function() {
	        // replace all tildes and carets from bower.json and package.json to use concrete version
	        // so when someone else installs it he gets exact version
	        // because we can't assure who ever publishes new version
	        // will mark it correctly
            bowerContent = fs.readFileSync(that.destinationPath('bower.json'), "utf8");
            bowerContent = bowerContent.replace(/\^/g, '').replace(/~/g, '');
            fs.writeFileSync(that.destinationPath('bower.json'), bowerContent);

            packageContent = fs.readFileSync(that.destinationPath('package.json'), "utf8");
            packageContent = packageContent.replace(/\^/g, '').replace(/~/g, '');
            fs.writeFileSync(that.destinationPath('package.json'), packageContent);
        });

        // if (this.useMaven === false) {
        // 	console.log('Removing maven files');
        // 	rmdir(this.destinationPath('WEB-INF'));
        // 	this.fs.delete(this.destinationPath('pom.xml'));
        // }
    },
	prompting: {
		prompt1 : function() {
            var done = this.async();
            this.prompt({
                type    : 'input',
                name    : 'pageTitle',
                message : 'Page title (it will be displayed in tab)?',
                default : ''
            }, function (answers) {
                this.pageTitle = answers.pageTitle;
                done();
            }.bind(this));
		},
		prompt2 : function() {
            var done = this.async();
            this.prompt({
                type    : 'input',
                name    : 'description',
                message : 'Project description (it will be set to meta description)?',
                default : ''
            }, function (answers) {
                this.description = answers.description;
                done();
            }.bind(this));
		},
        prompt3 : function() {
            var done = this.async();
            this.prompt({
                type    : 'input',
                name    : 'angularVersion',
                message : 'Which angular version (1.x version) you want to use?',
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
		prompt4 : function() {
			var done = this.async(),
				that = this;
			function bootstrapLessQuestion(callback) {
				that.prompt({
			      	type    : 'input',
			      	name    : 'useBootstrapLess',
			      	message : 'Do you want to use Bootstrap LESS (it will be compiled into your css, but you will be able to use it\'s variables)? (Y/n)',
			      	default : 'Y'
			    }, function(answers) {
			    	if (answers.useBootstrapLess === 'Y') {
			    		that.useBootstrapLess = true;
			    	} else if (answers.useBootstrapLess !== 'n') {
			    		that.log('Unknown option. Going with default answer (Y)');
			    		that.useBootstrapLess = true;
			    	}
			    	callback();
			    });
			}

	    	this.prompt({
		      	type    : 'input',
		      	name    : 'useBootstrap',
		      	message : 'Do you want to use Bootstrap? (Y/n)',
		      	default : 'Y'
		    }, function (answers) {
		    	this.useBootstrap = false;
		    	this.useBootstrapLess = false;
		    	if (answers.useBootstrap === 'Y') {
		    		this.useBootstrap = true;
		    		this.bowerDependencies.push('bootstrap');
		    		this.bowerDependencies.push('angular-bootstrap');
		    		bootstrapLessQuestion(done);
		    	} else if (answers.useBootstrap !== 'n') {
		    		this.useBootstrap = true;
		    		this.log('Unknown option. Going with default answer (Y)');
		    		this.bowerDependencies.push('bootstrap');
		    		this.bowerDependencies.push('angular-bootstrap');
		    		bootstrapLessQuestion(done);
		    	} else {
		    		done();
		    	}
			}.bind(this));
		},
		prompt5 : function() {
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
		prompt6 : function() {
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
		prompt7 : function() {
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
		prompt8 : function() {
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
		prompt9 : function() {
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
		},
		prompt10 : function() {
			var done = this.async(),
				that = this;
			this.prompt({
				type : 'input',
				name : 'useMaven',
				message : 'Are you going to use Maven for packaging? (Y/n)',
				default : 'Y'
			}, function(answers) {
		    	that.useMaven = false;
		    	if (answers.useMaven === 'Y') {
		    		that.useMaven = true;
		    	} else if (answers.useMaven !== 'n') {
		    		that.useMaven = true;
		    		that.log('Unknown option. Going with default answer (Y)');
		    	}

		    	if (that.useMaven) {
		    		that.prompt({
		    			type : 'input',
		    			name : 'mavenGroupId',
		    			message : 'Enter groupId:'
		    		}, function(answers) {
		    			that.mavenGroupId = answers.mavenGroupId;

			    		that.prompt({
			    			type : 'input',
			    			name : 'mavenArtifactId',
			    			message : 'Enter artifactId:'
			    		}, function(answers) {
			    			that.mavenArtifactId = answers.mavenArtifactId;

				    		that.prompt({
				    			type : 'input',
				    			name : 'mavenName',
				    			message : 'Enter name:'
				    		}, function(answers) {
				    			that.mavenName = answers.mavenName;

					    		that.prompt({
					    			type : 'input',
					    			name : 'mavenFinalName',
					    			message : 'Enter final name:'
					    		}, function(answers) {
					    			that.mavenFinalName = answers.mavenFinalName;

						    		that.prompt({
						    			type : 'input',
						    			name : 'nodeVersion',
						    			message : 'Enter node version (vX.X.X, https://nodejs.org/en/download/releases/):'
						    		}, function(answers) {
						    			that.nodeVersion = answers.nodeVersion;

							    		that.prompt({
							    			type : 'input',
							    			name : 'npmVersion',
							    			message : 'Enter NPM version (X.X.X, https://github.com/npm/npm/releases):'
							    		}, function(answers) {
							    			that.npmVersion = answers.npmVersion;
							    			done();
							    		});
						    		});
					    		});
				    		});
			    		});
		    		});
		    	} else {
		    		done();
		    	}
			});
		}
	}
});
