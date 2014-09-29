// Gruntfile.js

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    var globalConfig = {
        src: '../smarttuition/App',
        build: '../smarttuition/App_Build'
	};

	grunt.initConfig({

    	globalConfig: globalConfig,
		pkg: grunt.file.readJSON('package.json'),
		
		clean:{
			options:{force:true},
			all:{
				src: [
					'<%= globalConfig.build %>/**/*.*',
					'<%= globalConfig.build %>/*'
					]
			},
			min:{
				src: [
					'<%= globalConfig.build %>/**/*.js',					
					'!<%= globalConfig.build %>/**/*.min.js',
					'<%= globalConfig.build %>/*.css',					
					'!<%= globalConfig.build %>/*.min.css'
					]
			},
			temp:{
				src: [
					'<%= globalConfig.build %>/temp',					
					'<%= globalConfig.build %>/lib',
					]
			}
		},
		jshint: {
			options: {
				reporter: require('jshint-stylish')
			},
			build: ['Grunfile.js', '<%= globalConfig.src %>/Core/**/*.js']
		},
		concat: {
			dist: {
				src: [
					'<%= globalConfig.src %>/libs/j*.min.js',
					'<%= globalConfig.src %>/libs/angular.min.js',
					'<%= globalConfig.src %>/libs/angular-*.min.js',
					'<%= globalConfig.build %>/temp/app.min.js',
					'<%= globalConfig.build %>/temp/**/*Controller.min.js',
					'<%= globalConfig.build %>/temp/**/*Service.min.js'
				],
				dest: '<%= globalConfig.build %>/smarttuition.min.js'
			}
		},
		ngAnnotate: {
			options: {
				singleQuotes: true,
			},
			gen : {
				files: [
					{
						expand: true,
						cwd: '<%= globalConfig.src %>',
						src: ['app.js','Core/**/*Controller.js','Core/**/*Service.js'],
						dest: '<%= globalConfig.build %>/temp',
						ext:'.js'
					}
				]
			}

		},
		uglify: {
			options: {
				banner: '\n/* <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd hh:MM") %>*/\n'
			},
			gen:{
				files:[
					{
						expand: true,
						cwd: '<%= globalConfig.build %>/temp',
						src: ['**/*.js'],
						dest: '<%= globalConfig.build %>/temp',
						ext:'.min.js'
					}
				]	
			}
		},
		copy:{
			index:{
				files:[
					{
						src: '<%= globalConfig.src %>/index.html',
						dest: '<%= globalConfig.build %>/index.html'
					}
				]	
			}
		},
		templates: {
			css: '<link href="${file}" rel="stylesheet"/>',
			js: '<script src="${file}"></script>'
		},
		fileblocks: {
			dev: {
				src: '<%= globalConfig.build %>/index.html',
				blocks: {
				    'app': {
				        cwd: '<%= globalConfig.build %>',
				        src: '**/*.js'
				    }
				}
			},
			prod: {
				/* or multiple source files per target. */
				files: [
					{ src: 'index.html', blocks: {} },
					{ src: 'app/app.ts', blocks: {} }
				]
			}

		},

		//css 
		less: {
			build: {
				options: {
					strictMath: true,
					sourceMap: true,
					outputSourceFiles: true,
				},
				files: {
					'<%= globalConfig.build %>/css/bootstrap.css': '<%= globalConfig.src %>/styles/less/bootstrap.less'
				}
			}
		},
		autoprefixer: {
			options: {
				browsers: [
				  'Android 2.3',
				  'Android >= 4',
				  'Chrome >= 20',
				  'Firefox >= 24', // Firefox 24 is the latest ESR
				  'Explorer >= 8',
				  'iOS >= 6',
				  'Opera >= 12',
				  'Safari >= 6'
				]
			},
			core: {
				options: {
					map: true
				},
				src: '<%= globalConfig.build %>/css/bootstrap.css'
			},
		},
		csscomb: {
			options: {
				config: 'styles/content/less/.csscomb.json'
			},
			dist: {
				expand: true,
				cwd: 'dist/css/',
				src: ['*.css', '!*.min.css'],
				dest: 'dist/css/'
			}
		}
    });
   
    grunt.registerTask('test',['clean:all',
							   'less',
                               'autoprefixer',
                               'csscomb',
                               'ngAnnotate:gen',
                               'copy',
                               'fileblocks:dev'
                               ]);

    grunt.registerTask('default', ['less', 'autoprefixer' ,'csscomb']);

    grunt.registerTask('dev', ['jshint',
                               'less',
                               'autoprefixer',
                               'csscomb',
                               'clean:all',
                               'ngAnnotate',
                               'uglify' 

                              ]);

    grunt.registerTask('prod', ['jshint',
                               'less',
                               'autoprefixer',
                               'usebanner',
                               'csscomb',
                               'concat:dist',
                               'ngAnnotate',
                               'uglify',
                               'concat:postBuild'
                               ]);

};