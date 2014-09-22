﻿//'use strict';

//module.exports = function (grunt) {

//    require('load-grunt-tasks')(grunt);
//    require('time-grunt')(grunt);

//    // Configurable paths for the application
//    var applicationConfig = {
//        app: require('./bower.json').appPath || 'app',
//        dist: 'dist'
//    };

//    // Define the configuration for all the tasks
//    grunt.initConfig({

//        // Project settings
//        appConfig: applicationConfig,

//        // Watches files for changes and runs tasks based on the changed files
//        watch: {
//            bower: {
//                files: ['bower.json'],
//                tasks: ['wiredep']
//            },
//            js: {
//                files: ['<%= appConfig.app %>/scripts/{,*/}*.js'],
//                tasks: ['newer:jshint:all'],
//                options: {
//                    livereload: '<%= connect.options.livereload %>'
//                }
//            },
//            jsTest: {
//                files: ['test/spec/{,*/}*.js'],
//                tasks: ['newer:jshint:test', 'karma']
//            },
//            compass: {
//                files: ['<%= appConfig.app %>/styles/{,*/}*.{scss,sass}'],
//                tasks: ['compass:server', 'autoprefixer']
//            },
//            gruntfile: {
//                files: ['Gruntfile.js']
//            },
//            livereload: {
//                options: {
//                    livereload: '<%= connect.options.livereload %>'
//                },
//                files: [
//                  '<%= appConfig.app %>/{,*/}*.html',
//                  '.tmp/styles/{,*/}*.css',
//                  '<%= appConfig.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
//                ]
//            }
//        },

//        // The actual grunt server settings
//        connect: {
//            options: {
//                port: 9000,
//                // Change this to '0.0.0.0' to access the server from outside.
//                hostname: 'localhost',
//                livereload: 35729
//            },
//            livereload: {
//                options: {
//                    open: true,
//                    middleware: function (connect) {
//                        return [
//                          connect.static('.tmp'),
//                          connect().use(
//                            '/bower_components',
//                            connect.static('./bower_components')
//                          ),
//                          connect.static(appConfig.app)
//                        ];
//                    }
//                }
//            },
//            test: {
//                options: {
//                    port: 9001,
//                    middleware: function (connect) {
//                        return [
//                          connect.static('.tmp'),
//                          connect.static('test'),
//                          connect().use(
//                            '/bower_components',
//                            connect.static('./bower_components')
//                          ),
//                          connect.static(appConfig.app)
//                        ];
//                    }
//                }
//            },
//            dist: {
//                options: {
//                    open: true,
//                    base: '<%= appConfig.dist %>'
//                }
//            }
//        },

//        // Make sure code styles are up to par and there are no obvious mistakes
//        jshint: {
//            options: {
//                jshintrc: '.jshintrc',
//                reporter: require('jshint-stylish')
//            },
//            all: {
//                src: [
//                  'Gruntfile.js',
//                  '<%= appConfig.app %>/scripts/{,*/}*.js'
//                ]
//            },
//            test: {
//                options: {
//                    jshintrc: 'test/.jshintrc'
//                },
//                src: ['test/spec/{,*/}*.js']
//            }
//        },

//        // Empties folders to start fresh
//        clean: {
//            dist: {
//                files: [{
//                    dot: true,
//                    src: [
//                      '.tmp',
//                      '<%= appConfig.dist %>/{,*/}*',
//                      '!<%= appConfig.dist %>/.git*'
//                    ]
//                }]
//            },
//            server: '.tmp'
//        },

//        // Add vendor prefixed styles
//        autoprefixer: {
//            options: {
//                browsers: ['last 1 version']
//            },
//            dist: {
//                files: [{
//                    expand: true,
//                    cwd: '.tmp/styles/',
//                    src: '{,*/}*.css',
//                    dest: '.tmp/styles/'
//                }]
//            }
//        },

//        // Automatically inject Bower components into the app
//        wiredep: {
//            app: {
//                src: ['<%= appConfig.app %>/index.html'],
//                ignorePath: /\.\.\//
//            },
//            sass: {
//                src: ['<%= appConfig.app %>/styles/{,*/}*.{scss,sass}'],
//                ignorePath: /(\.\.\/){1,2}bower_components\//
//            }
//        },

//        // Compiles Sass to CSS and generates necessary files if requested
//        compass: {
//            options: {
//                sassDir: '<%= appConfig.app %>/styles',
//                cssDir: '.tmp/styles',
//                generatedImagesDir: '.tmp/images/generated',
//                imagesDir: '<%= appConfig.app %>/images',
//                javascriptsDir: '<%= appConfig.app %>/scripts',
//                fontsDir: '<%= appConfig.app %>/styles/fonts',
//                importPath: './bower_components',
//                httpImagesPath: '/images',
//                httpGeneratedImagesPath: '/images/generated',
//                httpFontsPath: '/styles/fonts',
//                relativeAssets: false,
//                assetCacheBuster: false,
//                raw: 'Sass::Script::Number.precision = 10\n'
//            },
//            dist: {
//                options: {
//                    generatedImagesDir: '<%= appConfig.dist %>/images/generated'
//                }
//            },
//            server: {
//                options: {
//                    debugInfo: true
//                }
//            }
//        },

//        // Renames files for browser caching purposes
//        filerev: {
//            dist: {
//                src: [
//                  '<%= appConfig.dist %>/scripts/{,*/}*.js',
//                  '<%= appConfig.dist %>/styles/{,*/}*.css',
//                  '<%= appConfig.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
//                  '<%= appConfig.dist %>/styles/fonts/*'
//                ]
//            }
//        },

//        // Reads HTML for usemin blocks to enable smart builds that automatically
//        // concat, minify and revision files. Creates configurations in memory so
//        // additional tasks can operate on them
//        useminPrepare: {
//            html: '<%= appConfig.app %>/index.html',
//            options: {
//                dest: '<%= appConfig.dist %>',
//                flow: {
//                    html: {
//                        steps: {
//                            js: ['concat', 'uglifyjs'],
//                            css: ['cssmin']
//                        },
//                        post: {}
//                    }
//                }
//            }
//        },

//        // Performs rewrites based on filerev and the useminPrepare configuration
//        usemin: {
//            html: ['<%= appConfig.dist %>/{,*/}*.html'],
//            css: ['<%= appConfig.dist %>/styles/{,*/}*.css'],
//            options: {
//                assetsDirs: ['<%= appConfig.dist %>', '<%= appConfig.dist %>/images']
//            }
//        },

//        // The following *-min tasks will produce minified files in the dist folder
//        // By default, your `index.html`'s <!-- Usemin block --> will take care of
//        // minification. These next options are pre-configured if you do not wish
//        // to use the Usemin blocks.
//        // cssmin: {
//        //   dist: {
//        //     files: {
//        //       '<%= appConfig.dist %>/styles/main.css': [
//        //         '.tmp/styles/{,*/}*.css'
//        //       ]
//        //     }
//        //   }
//        // },
//        // uglify: {
//        //   dist: {
//        //     files: {
//        //       '<%= appConfig.dist %>/scripts/scripts.js': [
//        //         '<%= appConfig.dist %>/scripts/scripts.js'
//        //       ]
//        //     }
//        //   }
//        // },
//        // concat: {
//        //   dist: {}
//        // },

//        imagemin: {
//            dist: {
//                files: [{
//                    expand: true,
//                    cwd: '<%= appConfig.app %>/images',
//                    src: '{,*/}*.{png,jpg,jpeg,gif}',
//                    dest: '<%= appConfig.dist %>/images'
//                }]
//            }
//        },

//        svgmin: {
//            dist: {
//                files: [{
//                    expand: true,
//                    cwd: '<%= appConfig.app %>/images',
//                    src: '{,*/}*.svg',
//                    dest: '<%= appConfig.dist %>/images'
//                }]
//            }
//        },

//        htmlmin: {
//            dist: {
//                options: {
//                    collapseWhitespace: true,
//                    conservativeCollapse: true,
//                    collapseBooleanAttributes: true,
//                    removeCommentsFromCDATA: true,
//                    removeOptionalTags: true
//                },
//                files: [{
//                    expand: true,
//                    cwd: '<%= appConfig.dist %>',
//                    src: ['*.html', 'views/{,*/}*.html'],
//                    dest: '<%= appConfig.dist %>'
//                }]
//            }
//        },

//        // ng-annotate tries to make the code safe for minification automatically
//        // by using the Angular long form for dependency injection.
//        ngAnnotate: {
//            dist: {
//                files: [{
//                    expand: true,
//                    cwd: '.tmp/concat/scripts',
//                    src: ['*.js', '!oldieshim.js'],
//                    dest: '.tmp/concat/scripts'
//                }]
//            }
//        },

//        // Replace Google CDN references
//        cdnify: {
//            dist: {
//                html: ['<%= appConfig.dist %>/*.html']
//            }
//        },

//        // Copies remaining files to places other tasks can use
//        copy: {
//            dist: {
//                files: [{
//                    expand: true,
//                    dot: true,
//                    cwd: '<%= appConfig.app %>',
//                    dest: '<%= appConfig.dist %>',
//                    src: [
//                      '*.{ico,png,txt}',
//                      '.htaccess',
//                      '*.html',
//                      'views/{,*/}*.html',
//                      'images/{,*/}*.{webp}',
//                      'fonts/*'
//                    ]
//                }, {
//                    expand: true,
//                    cwd: '.tmp/images',
//                    dest: '<%= appConfig.dist %>/images',
//                    src: ['generated/*']
//                }, {
//                    expand: true,
//                    cwd: 'bower_components/bootstrap/dist',
//                    src: 'fonts/*',
//                    dest: '<%= appConfig.dist %>'
//                }]
//            },
//            styles: {
//                expand: true,
//                cwd: '<%= appConfig.app %>/styles',
//                dest: '.tmp/styles/',
//                src: '{,*/}*.css'
//            }
//        },

//        // Run some tasks in parallel to speed up the build process
//        concurrent: {
//            server: [
//              'compass:server'
//            ],
//            test: [
//              'compass'
//            ],
//            dist: [
//              'compass:dist',
//              'imagemin',
//              'svgmin'
//            ]
//        },

//        // Test settings
//        karma: {
//            unit: {
//                configFile: 'test/karma.conf.js',
//                singleRun: true
//            }
//        }
//    });


//    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
//        if (target === 'dist') {
//            return grunt.task.run(['build', 'connect:dist:keepalive']);
//        }

//        grunt.task.run([
//          'clean:server',
//          'wiredep',
//          'concurrent:server',
//          'autoprefixer',
//          'connect:livereload',
//          'watch'
//        ]);
//    });

//    grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
//        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
//        grunt.task.run(['serve:' + target]);
//    });

//    grunt.registerTask('test', [
//      'clean:server',
//      'concurrent:test',
//      'autoprefixer',
//      'connect:test',
//      'karma'
//    ]);

//    grunt.registerTask('build', [
//      'clean:dist',
//      'wiredep',
//      'useminPrepare',
//      'concurrent:dist',
//      'autoprefixer',
//      'concat',
//      'ngAnnotate',
//      'copy:dist',
//      'cdnify',
//      'cssmin',
//      'uglify',
//      'filerev',
//      'usemin',
//      'htmlmin'
//    ]);

//    grunt.registerTask('default', [
//      'newer:jshint',
//      'test',
//      'build'
//    ]);
//};
